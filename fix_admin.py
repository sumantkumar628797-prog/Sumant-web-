import re

filepath = 'src/components/AdminPortalModal.tsx'
with open(filepath, 'r') as f:
    content = f.read()

# Replace import of useCMS
if 'import { useCMS }' not in content:
    content = content.replace("import { supabase } from '../lib/supabase';", "import { supabase } from '../lib/supabase';\nimport { useCMS, CMSData } from '../context/CMSContext';")

# Add CMS activeTab type
content = content.replace("'pricing' | 'notifications'>('bookings');", "'pricing' | 'notifications' | 'cms'>('bookings');")

# Find the destructuring or where the function begins
# `export const AdminPortalModal: React.FC<AdminPortalModalProps> = ({...}) => {`
# insert `const { data: cmsData, updateData: updateCMSData } = useCMS();` inside the component
if 'const { data: cmsData' not in content:
    pattern = r'(export const AdminPortalModal\s*:.*?\=>\s*\{)'
    def replacer(match):
        return match.group(1) + '\n  const { data: cmsData, updateData: updateCMSData } = useCMS();\n  const [cmsEditorKey, setCmsEditorKey] = useState<keyof CMSData>("AGENCY_BRAND");\n  const [cmsEditorContent, setCmsEditorContent] = useState("");\n'
    content = re.sub(pattern, replacer, content, count=1)

# Add CMS tab button
# Find `<button ... onClick={() => setActiveTab('notifications')}`
tab_html = """                  onClick={() => setActiveTab('notifications')}
                  className={`px-4 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 transition-all ${
                    activeTab === 'notifications'
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <Bell className="w-4 h-4" />
                  <span>Notification Tester</span>
                </button>
                <button
                  onClick={() => setActiveTab('cms')}
                  className={`px-4 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 transition-all ${
                    activeTab === 'cms'
                      ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <Database className="w-4 h-4" />
                  <span>CMS Manager</span>
                </button>"""

if '<span>CMS Manager</span>' not in content:
    content = re.sub(r"onClick\{\(\) => setActiveTab\('notifications'\)\}.*?<\/button>", tab_html, content, flags=re.DOTALL)

# Add CMS View
cms_view = """
        {/* --- CMS VIEW --- */}
        {activeTab === 'cms' && (
          <div className="flex-1 overflow-hidden flex flex-col p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Database className="w-6 h-6 text-indigo-400" />
                Headless CMS Editor
              </h2>
              <p className="text-sm text-slate-400">Edit raw JSON data safely. Changes apply instantly.</p>
            </div>
            
            <div className="flex gap-4 mb-4 overflow-x-auto pb-2">
              {(Object.keys(cmsData) as Array<keyof CMSData>).map((key) => (
                <button
                  key={key}
                  onClick={() => {
                    setCmsEditorKey(key);
                    setCmsEditorContent(JSON.stringify(cmsData[key], null, 2));
                  }}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap ${
                    cmsEditorKey === key ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {key.replace('_DATA', '').replace('_', ' ')}
                </button>
              ))}
            </div>

            <div className="flex-1 flex flex-col gap-4 min-h-[400px]">
              <textarea
                value={cmsEditorContent || JSON.stringify(cmsData[cmsEditorKey], null, 2)}
                onChange={(e) => setCmsEditorContent(e.target.value)}
                className="flex-1 bg-slate-900 border border-slate-700 rounded-xl p-4 font-mono text-sm text-green-400 focus:outline-none focus:border-indigo-500"
                spellCheck="false"
              />
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setCmsEditorContent(JSON.stringify(cmsData[cmsEditorKey], null, 2))}
                  className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700"
                >
                  Reset
                </button>
                <button
                  onClick={async () => {
                    try {
                      const parsed = JSON.parse(cmsEditorContent);
                      const success = await updateCMSData(cmsEditorKey, parsed);
                      if (success) {
                        alert('CMS Data updated successfully!');
                      } else {
                        alert('Failed to update CMS Data. Check console.');
                      }
                    } catch(e) {
                      alert('Invalid JSON! Please fix syntax errors before saving.');
                    }
                  }}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 font-bold flex items-center gap-2"
                >
                  <Save className="w-4 h-4" /> Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
"""

if 'Headless CMS Editor' not in content:
    # insert before {/* --- PROJECTS VIEW --- */}
    content = content.replace("{/* --- PROJECTS VIEW --- */}", cms_view + "\n\n        {/* --- PROJECTS VIEW --- */}")

with open(filepath, 'w') as f:
    f.write(content)
