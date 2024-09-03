# Copyright (c) 2024, Sanskar and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class SalesPersonTargetAllocation(Document):
	@frappe.whitelist()
	def get_weekdays(self):
		week_list = [
			"Sunday",
			"Monday",
			"Tuesday",
			"Wednesday",
			"Thursday",
			"Friday",
			"Saturday",
		]
		idx = 1
		for m in week_list:
			mnth = self.append("weekly_target")
			mnth.day = m
			mnth.quantity = 10
			mnth.idx = idx
			idx += 1
