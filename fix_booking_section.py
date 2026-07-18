import re

filepath = 'src/components/BookingSection.tsx'
with open(filepath, 'r') as f:
    content = f.read()

# Fix Netlify Explainer button
btn_pattern = r'className="w-full flex items-center justify-between p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono hover:bg-cyan-500/20 transition-colors"'
new_btn_class = r'className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 sm:p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono hover:bg-cyan-500/20 transition-colors text-left"'
content = content.replace(btn_pattern, new_btn_class)

btn_text_pattern = r'<span>How does this booking system work for FREE on Netlify without any paid CRM\?<\/span>'
new_btn_text = r'<span className="leading-tight">How does this booking system work for FREE on Netlify without any paid CRM?</span>'
content = content.replace(btn_text_pattern, new_btn_text)

# Ensure select elements don't overflow on mobile
select_pattern = r'className=\{`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition-all cursor-pointer \$\{'
new_select_class = r'className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition-all cursor-pointer text-ellipsis overflow-hidden ${'
content = content.replace(select_pattern, new_select_class)

# Ensure CTA text wraps
cta_text = r'<span>Lock In Your VIP Consultation \(₹0 Deposit\)<\/span>'
new_cta_text = r'<span className="whitespace-normal">Lock In Your VIP Consultation (₹0 Deposit)</span>'
content = content.replace(cta_text, new_cta_text)

# Also fix the CTA button container just in case
cta_btn = r'className="w-full py-4 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 text-slate-950 font-extrabold text-base shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 transition-all flex items-center justify-center gap-2 group disabled:opacity-50 cursor-pointer"'
new_cta_btn = r'className="w-full py-3 sm:py-4 px-4 sm:px-6 rounded-3xl sm:rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 text-slate-950 font-extrabold text-sm sm:text-base shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 transition-all flex items-center justify-center gap-2 group disabled:opacity-50 cursor-pointer text-center"'
content = content.replace(cta_btn, new_cta_btn)

# Make sure the main grid wrap spacing is slightly tighter on mobile if needed, though gap-4 is fine.
# Let's fix the inner div padding in isModal
isModal_pattern = r'<div className="p-6 sm:p-8 max-w-2xl mx-auto">'
new_isModal_pattern = r'<div className="p-4 sm:p-8 max-w-2xl mx-auto w-full min-w-0">'
content = content.replace(isModal_pattern, new_isModal_pattern)

with open(filepath, 'w') as f:
    f.write(content)
