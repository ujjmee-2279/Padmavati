import frappe

@frappe.whitelist()
def generate_unique_code(country=None, state=None, city=None, area=None, street=None):
    # Initialize an empty set to hold unique location codes
    code_parts_set = set()
    # Initialize an empty list to hold ordered location codes
    code_parts = []

    # Helper function to get location codes and their parent locations
    def get_location_codes(location_id):
        location_codes = []
        while location_id:
            # Get the geographic location document
            loc_doc = frappe.get_doc('Geographic Location', location_id)
            location_code = str(loc_doc.location_code)  # Convert to string

            # Add the location code to the list if it's not already present
            if location_code not in code_parts_set:
                location_codes.append(location_code)  # Collect for later

            # Move to the parent location
            location_id = loc_doc.parent_geographic_location if loc_doc.parent_geographic_location else None
        
        # Append the collected location codes in reverse order
        for code in reversed(location_codes):
            if code not in code_parts_set:
                code_parts.append(code)
                code_parts_set.add(code)

    # Retrieve and process location codes for each level
    if country:
        get_location_codes(country)
    if state:
        get_location_codes(state)
    if city:
        get_location_codes(city)
    if area:
        get_location_codes(area)
    if street:
        get_location_codes(street)  

    # Combine the parts to form the unique ID
    unique_id = ''.join(code_parts)

    print("\n\n\n\nUnique ID:", unique_id)
    return unique_id

