// Copyright (c) 2024, Sanskar and contributors
// For license information, please see license.txt

frappe.ui.form.on('Sales Person Target Allocation', {
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
    onload(frm) {
        if (frm.doc.__islocal) {
            return frm.call("get_weekdays").then(() => {
                frm.refresh_field("weekly_target");
            });
        }
    },
});
