import re
import os

filepath = 'src/components/LiveDemoModal.tsx'
if os.path.exists(filepath):
    with open(filepath, 'r') as f:
        content = f.read()
    content = content.replace('w-full max-w-4xl rounded-3xl overflow-hidden', 'w-full max-w-4xl rounded-2xl sm:rounded-3xl overflow-hidden min-w-0')
    content = content.replace('<div className="p-8 sm:p-12">', '<div className="p-4 sm:p-8 md:p-12 min-w-0">')
    with open(filepath, 'w') as f:
        f.write(content)

filepath = 'src/components/AiScopeAdvisorModal.tsx'
if os.path.exists(filepath):
    with open(filepath, 'r') as f:
        content = f.read()
    content = content.replace('w-full max-w-3xl rounded-3xl border shadow-2xl', 'w-full max-w-3xl rounded-2xl sm:rounded-3xl border shadow-2xl min-w-0')
    content = content.replace('p-8 border-b', 'p-4 sm:p-8 border-b')
    content = content.replace('p-8 pt-0', 'p-4 sm:p-8 pt-0')
    content = content.replace('p-8 pb-4', 'p-4 sm:p-8 pb-4')
    with open(filepath, 'w') as f:
        f.write(content)

filepath = 'src/components/NetlifyGuideModal.tsx'
if os.path.exists(filepath):
    with open(filepath, 'r') as f:
        content = f.read()
    content = content.replace('w-full max-w-4xl rounded-3xl border shadow-2xl', 'w-full max-w-4xl rounded-2xl sm:rounded-3xl border shadow-2xl min-w-0')
    content = content.replace('p-8 border-b', 'p-4 sm:p-8 border-b')
    content = content.replace('p-8 flex-1', 'p-4 sm:p-8 flex-1')
    with open(filepath, 'w') as f:
        f.write(content)

