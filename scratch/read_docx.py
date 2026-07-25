import os
import zipfile
import xml.etree.ElementTree as ET

def read_docx(file_path):
    if not os.path.exists(file_path):
        return f"{file_path} does not exist"
    try:
        doc = zipfile.ZipFile(file_path)
        xml_content = doc.read('word/document.xml')
        root = ET.fromstring(xml_content)
        
        # Docx XML text tags are usually {http://schemas.openxmlformats.org/wordprocessingml/2006/main}t
        namespaces = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
        text_elements = root.findall('.//w:t', namespaces)
        text = ''.join([el.text for el in text_elements if el.text])
        return text
    except Exception as e:
        return f"Error reading {file_path}: {e}"

downloads_dir = "/Users/priyamrupapara/Downloads"
specs_path = os.path.join(downloads_dir, "SURGE_Product_Formulations_and_Specifications.docx")
roast_path = os.path.join(downloads_dir, "ROAST - The Idea Roast Council.docx")

print("--- Specifications DOCX ---")
print(read_docx(specs_path)[:1000])

print("\n--- Roast DOCX ---")
print(read_docx(roast_path)[:1000])
