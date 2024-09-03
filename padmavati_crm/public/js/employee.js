frappe.ui.form.on('Employee', {
    before_save: function(frm) {
        if (frm.doc.custom_location) {
            let args = {
                custom_location: frm.doc.custom_location,
            };

            frappe.call({
                method: 'padmavati_crm.public.py.employee.generate_unique_code',
                args: args,
                callback: function(response) {
                    if (response.message) {
                        console.log(response.message);
                        frm.set_value('custom_unique_id', response.message);
                    }
                }
            });
        } else {
            frappe.msgprint(__('To generate a unique code for the employee, the location is required.'));
            frappe.validated = false;
        }
    },
    refresh: function(frm) {
        frm.set_query("custom_country", function () {
            return {
                "filters": {
                    "location_type": "Country"

                }
            }
        })
        frm.set_query("custom_state", function () {
            return {
                "filters": {
                    "location_type": "State"
                }
            }
        })
        frm.set_query("custom_city", function () {
            return {
                "filters": {
                    "location_type": "City"
                }
            }
        })
        frm.set_query("custom_area", function () {
            return {
                "filters": {
                    "location_type": "Area"
                }
            }
        })
        frm.set_query("custom_street", function () {
            return {
                "filters": {
                    "location_type": "Street"
                }
            }
        })
    },
    before_save: function(frm) {
        
        if (frm.doc.custom_country || frm.doc.custom_state
            || frm.doc.custom_city || frm.doc.custom_area 
            || frm.doc.custom_street  
        ) {
            let args = {
                country: frm.doc.custom_country,
                state: frm.doc.custom_state,
                city: frm.doc.custom_city,
                area: frm.doc.custom_area,
                street: frm.doc.custom_street,


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
            frappe.msgprint(__('To generate a unique code for the employee, the address hierarchy needs to be filled out '));
            frappe.validated = false;
        }
    }

});
