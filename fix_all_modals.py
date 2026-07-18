import os
import glob

for filepath in glob.glob("src/components/*Modal*.tsx"):
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Replace `p-4 bg-slate-950/80` or similar with `p-2 sm:p-4 bg-slate-950/...`
    content = content.replace('p-4 bg-slate-950', 'p-2 sm:p-4 bg-slate-950')
    content = content.replace('my-8 ', 'my-4 sm:my-8 ')
    
    with open(filepath, 'w') as f:
        f.write(content)
