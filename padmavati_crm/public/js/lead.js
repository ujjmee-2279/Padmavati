// Custom JS file for Lead Doctype
frappe.ui.form.on('Lead', {
    refresh(frm) {
        // Setting the query for only showing the customer group which has lzead group checked
        frm.set_query("custom_lead_group", function () {
            return {
                "filters": {
                    "custom_is_lead_group": 1
                }
            }
        })
        frm.set_query("custom_geolocation_country", function () {
            return {
                "filters": {
                    "location_type": "Country"
                }
            }
        })
        frm.set_query("custom_geolocation_state", function () {
            return {
                "filters": {
                    "location_type": "State"
                }
            }
        })
        frm.set_query("custom_geolocation_city", function () {
            return {
                "filters": {
                    "location_type": "City"
                }
            }
        })
        frm.set_query("custom_geolocation_area", function () {
            return {
                "filters": {
                    "location_type": "Area"
                }
            }
        })
        frm.set_query("custom_geolocation_street", function () {
            return {
                "filters": {
                    "location_type": "Street"
                }
            }
        })
        // Setting button based on the qualification status(In Process)
        if (frm.doc.qualification_status === "In Process") {
            frm.add_custom_button(__("Create Customer", function () {
                console.log("Customer Created")
            }))
        }
    },
    // Fetching the child table from the customer group child table based on the Customer Lead Group 
    custom_lead_group(frm) {
        // Clear the table if custom_lead_group is empty
        if (!frm.doc.custom_lead_group) {
            frm.clear_table('custom_document_checklist');
            frm.refresh_field('custom_document_checklist');
            return;
        }
        // If custom_lead_group has a value, fetch and append mandatory documents
        if (frm.doc.custom_lead_group) {
            frappe.call({
                method: "frappe.client.get",
                args: {
                    doctype: "Customer Group",
                    name: frm.doc.custom_lead_group
                },
                callback: (response) => {
                    if (response.message) {
                        // Clear existing rows before appending new ones
                        frm.clear_table('custom_document_checklist');

                        response.message.custom_document_checklist.forEach(function (doc) {
                            // Only append mandatory rows
                            if (doc.is_mandatory) {
                                var child = frm.add_child('custom_document_checklist');
                                frappe.model.set_value(child.doctype, child.name, 'document_name', doc.required_documents);
                                frappe.model.set_value(child.doctype, child.name, 'document_value', '');
                            }
                        });

                        frm.refresh_field('custom_document_checklist');
                    }
                }
            });
        }
    },

    before_save: function(frm) {
        
        if (frm.doc.custom_geolocation_country || frm.doc.custom_geolocation_state
            || frm.doc.custom_geolocation_city || frm.doc.custom_geolocation_area 
            || frm.doc.custom_geolocation_street  
        ) {
            let args = {
                country: frm.doc.custom_geolocation_country,
                state: frm.doc.custom_geolocation_state,
                city: frm.doc.custom_geolocation_city,
                area: frm.doc.custom_geolocation_area,
                street: frm.doc.custom_geolocation_street,


            };

            frappe.call({
                method: 'padmavati_crm.public.py.lead.generate_unique_code',
                args: args,
                callback: function(response) {
                    if (response.message) {
                        console.log(response.message);
                        frm.set_value('custom_unique_id', response.message);
                    }
                }
            });
        } else {
            frappe.msgprint(__('To generate a unique code for the employee, the address hierarchy needs to be filled out.'));
            frappe.validated = false;
        }
    }

});
