// Copyright (c) 2024, Sanskar and contributors
// For license information, please see license.txt

frappe.ui.form.on('Sales Person Target Allocation', {
    onload(frm) {
        frm.set_query("country", function () {
            return {
                "filters": {
                    "location_type": "Country"
                }
            }
        })
        frm.set_query("state", function () {
            return {
                "filters": {
                    "location_type": "State"
                }
            }
        })
        frm.set_query("city", function () {
            return {
                "filters": {
                    "location_type": "City"
                }
            }
        })
        frm.set_query("districtarea", function () {
            return {
                "filters": {
                    "location_type": "District"
                }
            }
        })
        frm.set_query("street", function () {
            return {
                "filters": {
                    "location_type": "Street"
                }
            }
        })
    },
    before_save: function (frm) {
        let naming_series = [];

        if (frm.doc.daily) {
            naming_series.push('Daily');
        }
        if (frm.doc.weekly) {
            naming_series.push('Weekly');
        }
        if (frm.doc.monthly) {
            naming_series.push('Monthly');
        }

        // Joining the selected options with a hyphen
        let naming_series_str = naming_series.join('-');

        // Seting the naming_series field
        frm.set_value('naming_series', naming_series_str);

        // Refresh the naming_series field to reflect changes in the form
        frm.refresh_field("naming_series");
    },
    daily(frm) {
        // Check if either weekly or monthly targets are set
        if (frm.doc.weekly || frm.doc.monthly) {
            // Reset weekly and monthly fields to 0
            frm.set_value("weekly", 0);
            frm.set_value("monthly", 0);
    
            // Refresh the fields to reflect the changes on the form
            frm.refresh_field("weekly");
            frm.refresh_field("monthly");
        }
    },
    weekly(frm) {
        // Check if either daily or monthly targets are set
        if (frm.doc.daily || frm.doc.monthly) {
            // Reset weekly and monthly fields to 0
            frm.set_value("daily", 0);
            frm.set_value("monthly", 0);
    
            // Refresh the fields to reflect the changes on the form
            frm.refresh_field("daily");
            frm.refresh_field("monthly");
        }
    },
    montly(frm) {
        // Check if either weekly or daily targets are set
        if (frm.doc.weekly || frm.doc.daily) {
            // Reset weekly and monthly fields to 0
            frm.set_value("weekly", 0);
            frm.set_value("daily", 0);
    
            // Refresh the fields to reflect the changes on the form
            frm.refresh_field("weekly");
            frm.refresh_field("daily");
        }
    },
    fetch_employees(frm) {
        
    }
        
});
