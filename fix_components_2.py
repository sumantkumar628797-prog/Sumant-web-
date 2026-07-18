import os
import re

component_dir = 'src/components'
files_to_fix = [
    ('BookingSection.tsx', ['AGENCY_BRAND']),
    ('Footer.tsx', ['AGENCY_BRAND']),
    ('Navbar.tsx', ['AGENCY_BRAND']),
    ('PortfolioSection.tsx', ['PORTFOLIO_PROJECTS']),
    ('PricingSection.tsx', ['PRICING_PACKAGES']),
    ('ServicesSection.tsx', ['SERVICES_DATA'])
]

for filename, vars in files_to_fix:
    filepath = os.path.join(component_dir, filename)
    with open(filepath, 'r') as f:
        content = f.read()
        
    destructure = f"  const {{ data: {{ {', '.join(vars)} }} }} = useCMS();\n"
    
    # Use regex to find `=> {` that corresponds to the component.
    pattern = r'(export const \w+.*?=>\s*\{)'
    
    def replacer(match):
        return match.group(1) + '\n' + destructure
    
    new_content = re.sub(pattern, replacer, content, count=1, flags=re.DOTALL)
    
    with open(filepath, 'w') as f:
        f.write(new_content)
