import glob
import re

for filepath in glob.glob('src/components/*Modal*.tsx'):
    with open(filepath, 'r') as f:
        content = f.read()
    
    # 1. Replace the wrapper div
    # From: <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
    # To:   <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md">\n      <div className="flex min-h-full items-center justify-center p-4">
    
    pattern = r'<div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 (bg-slate-[^ ]+ backdrop-blur-md) overflow-y-auto">'
    
    def replacer(match):
        bg_classes = match.group(1)
        return f'<div className="fixed inset-0 z-50 overflow-y-auto {bg_classes}">\n      <div className="flex min-h-full items-center justify-center p-4">'
    
    content, num_subs = re.subn(pattern, replacer, content)
    
    if num_subs > 0:
        # 2. Add an extra closing div at the end before the last closing tags
        # Most of these modals end with:
        #       </motion.div>
        #     </div>
        #   );
        # }
        
        # We need to add one more `</div>` to close the `flex min-h-full ...` wrapper.
        # Let's replace the last `    </div>\n  );` with `      </div>\n    </div>\n  );`
        content = re.sub(r'    </div>\n  \);\n};\n$', r'      </div>\n    </div>\n  );\n};\n', content)
        
        # Edge case: some might not end exactly like that. Let's use a safer replacement.
        # It's better to just write the specific replacements for each modal if there's only 4 of them.
        with open(filepath, 'w') as f:
            f.write(content)

