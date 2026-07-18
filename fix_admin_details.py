import re

filepath = 'src/components/AdminPortalModal.tsx'
with open(filepath, 'r') as f:
    content = f.read()

# 1. Update Username and Password
content = content.replace("username === 'sumantweb6287' && password === '628797'", "username === 'sumant' && password === '6287'")

# 2. Add Date and Time to the lead card
# We will insert a new div in the grid inside the lead card
# `<div><strong className="text-slate-300">Project:</strong> {l.projectType}</div>`
# Let's add the Date and Time next to it
grid_item = """<div><strong className="text-slate-300">Project:</strong> {l.projectType}</div>
                              <div className="col-span-full sm:col-span-3 pt-1 border-t border-slate-800/50 mt-1 flex items-center gap-1.5 text-[10px] text-slate-500">
                                <Clock className="w-3 h-3" />
                                {new Date(l.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} at {new Date(l.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                              </div>"""

if "toLocaleDateString" not in content.split('<div><strong className="text-slate-300">Project:</strong> {l.projectType}</div>')[1][:200]:
    content = content.replace('<div><strong className="text-slate-300">Project:</strong> {l.projectType}</div>', grid_item)

with open(filepath, 'w') as f:
    f.write(content)
