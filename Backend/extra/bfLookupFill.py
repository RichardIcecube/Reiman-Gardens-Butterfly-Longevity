import pandas as pd
import math
import requests

# Read the Excel file
df = pd.read_excel("D:/New folder/main/School/IAState/402/butterfly_7/20_years_of_butterflies.xlsx")

# Iterate over each row in the DataFrame
print(df)
for index, row in df.iterrows():
    sci_name = row['Species']
    norm_name = row['Common name']
    if(not isinstance(sci_name, str) and math.isnan(sci_name)): sci_name = "NONE FOUND"
    if(not isinstance(norm_name, str) and math.isnan(norm_name)): norm_name = "NONE FOUND"
    
    # Create a dictionary for each row
    data = {
        'scientificName': sci_name,
        'normalName': norm_name
    }
    
    # Send the POST request for each row
    url = 'http://localhost:8080/bflookup'
    response = requests.post(url, json=data)

    # Check the response status code
    if response.status_code == 200:
        print('POST request successful for row', index)
    else:
        print('POST request failed for row', index)
