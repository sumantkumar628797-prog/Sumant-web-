import re

filepath = 'src/App.tsx'
with open(filepath, 'r') as f:
    content = f.read()

# Fix booking modal wrapper
pattern1 = r'className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto"'
repl1 = r'className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto"'

pattern2 = r'className=\{`w-full max-w-2xl rounded-3xl border shadow-2xl my-8 overflow-hidden \$\{'
repl2 = r'className={`w-full max-w-2xl rounded-2xl sm:rounded-3xl border shadow-2xl my-4 sm:my-8 overflow-hidden min-w-0 ${'

content = re.sub(pattern1, repl1, content)
content = content.replace('w-full max-w-2xl rounded-3xl border shadow-2xl my-8 overflow-hidden', 'w-full max-w-2xl rounded-2xl sm:rounded-3xl border shadow-2xl my-4 sm:my-8 overflow-hidden min-w-0')

with open(filepath, 'w') as f:
    f.write(content)
