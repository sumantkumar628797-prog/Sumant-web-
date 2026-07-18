import os
import re

component_dir = 'src/components'

for filename in os.listdir(component_dir):
    if not filename.endswith('.tsx'):
        continue
    filepath = os.path.join(component_dir, filename)
    with open(filepath, 'r') as f:
        content = f.read()
        
    if 'useCMS' in content:
        # Find the function definition
        # export const Hero: React.FC<HeroProps> = ({...}) => {
        # or export const ContactSection = ({...}) => {
        
        # We need to insert `const { data } = useCMS();` right after `{` of the component definition
        # Find `=> {` 
        
        # Determine what variables this file uses that come from CMSData
        variables = ["AGENCY_BRAND", "SERVICES_DATA", "PORTFOLIO_PROJECTS", "WHY_CHOOSE_US_DATA", "TESTIMONIALS_DATA", "PRICING_PACKAGES", "FAQ_DATA"]
        used_vars = [v for v in variables if v in content]
        
        if used_vars:
            destructure = f"  const {{ data: {{ {', '.join(used_vars)} }} }} = useCMS();\n"
            
            # Use regex to find `=> {` that corresponds to the component.
            # Usually it's `export const ComponentName... = (...) => {`
            pattern = r'(export const \w+.*?=>\s*\{)'
            
            def replacer(match):
                return match.group(1) + '\n' + destructure
            
            # Only replace the FIRST occurrence in the file to avoid replacing inner arrow functions
            new_content = re.sub(pattern, replacer, content, count=1)
            
            with open(filepath, 'w') as f:
                f.write(new_content)
