import re

filepath = 'src/components/AdminPortalModal.tsx'
with open(filepath, 'r') as f:
    content = f.read()

# 1. Replace import of useCMS if missing
if 'import { useCMS' not in content:
    content = content.replace("import { supabase } from '../lib/supabase';", "import { supabase } from '../lib/supabase';\nimport { useCMS, CMSData } from '../context/CMSContext';")

# 2. Update activeTab type if missing
if "'cms'" not in content.split("const [activeTab, setActiveTab] = useState<")[1].split(">")[0]:
    content = content.replace("'pricing' | 'notifications'>('bookings');", "'pricing' | 'notifications' | 'cms'>('bookings');")

# 3. Insert hook and state
if 'const { data: cmsData' not in content:
    pattern = r'(export const AdminPortalModal\s*:.*?\=>\s*\{)'
    def replacer(match):
        return match.group(1) + '\n  const { data: cmsData, updateData: updateCMSData } = useCMS();\n  const [cmsEditorKey, setCmsEditorKey] = useState<keyof CMSData>("AGENCY_BRAND");\n  const [cmsEditorContent, setCmsEditorContent] = useState("");\n'
    content = re.sub(pattern, replacer, content, count=1)

# 4. Add CMS tab button right after notifications button
button_pattern = r"(<button\s+onClick=\{\(\) => setActiveTab\('notifications'\)\}.*?<\/button>)"
tab_html = """
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
                </button>
"""
def btn_replacer(match):
    return match.group(1) + tab_html
if 'CMS Manager' not in content:
    content = re.sub(button_pattern, btn_replacer, content, flags=re.DOTALL)

# 5. Add CMS View right before notifications view
view_pattern = r"(\{\s*activeTab === 'notifications'\s*&&\s*\()"
cms_view = """
        {activeTab === 'cms' && (
          <div className="flex-1 overflow-hidden flex flex-col p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Database className="w-6 h-6 text-indigo-400" />
                Headless CMS Editor
              </h2>
              <p className="text-sm text-slate-400">Edit raw JSON data safely. Changes apply instantly without rebuilds.</p>
            </div>
            
            <div className="flex gap-4 mb-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
              {(Object.keys(cmsData) as Array<keyof CMSData>).map((key) => (
                <button
                  key={key}
                  onClick={() => {
                    setCmsEditorKey(key);
                    setCmsEditorContent(JSON.stringify(cmsData[key], null, 2));
                  }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                    cmsEditorKey === key ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {key.replace('_DATA', '').replace('_PROJECTS', '').replace('_PACKAGES', '').replace('_', ' ')}
                </button>
              ))}
            </div>

            <div className="flex-1 flex flex-col gap-4 min-h-[400px]">
              <textarea
                value={cmsEditorContent || JSON.stringify(cmsData[cmsEditorKey], null, 2)}
                onChange={(e) => setCmsEditorContent(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-700 rounded-xl p-4 font-mono text-sm text-green-400 focus:outline-none focus:border-indigo-500 overflow-y-auto"
                spellCheck="false"
              />
              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setCmsEditorContent(JSON.stringify(cmsData[cmsEditorKey], null, 2))}
                  className="px-5 py-2.5 bg-slate-800 text-white rounded-xl hover:bg-slate-700 font-medium transition-colors"
                >
                  Discard Changes
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
                  className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 font-bold flex items-center gap-2 shadow-lg shadow-indigo-500/20 transition-all"
                >
                  <Save className="w-4 h-4" /> Save to Database
                </button>
              </div>
            </div>
          </div>
        )}

"""
def view_replacer(match):
    return cms_view + match.group(1)
if 'Headless CMS Editor' not in content:
    content = re.sub(view_pattern, view_replacer, content, flags=re.DOTALL)

with open(filepath, 'w') as f:
    f.write(content)
