# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

---
I have broken the task down into 3 parts. The first part must be completed before the others, but the second and third tickets can be worked on simultaneously. 
The first ticket is intended as a backend task, and the second ticket is a frontend task. 
Depending on where the PDF generator code lives (I assume the backend), the third ticket could be done by either a backend or a frontend engineer.

---
### Add `custom_id` to Agents table [Ticket #1]

Store a new field, `custom_id` on the Agent table in the database:
- It is a string field
- It has a unique constraint
- It is nullable

Make sure that any API endpoints returning an `Agent` include this new field in the response

---
### Add `custom_id` field to Add/Edit Agents UI [Ticket 2, blocked by #1]

When adding a new `Agent` through the settings UI, a textbox should be included for adding a `custom_id`
- The field is not required
- It is editable, so that when updating an Agent later, users can set a new `custom_id`

---
### Use Agents' `custom_id` when generating reports [Ticket 3, blocked by #1]

When generating a report, use the `custom_id` if it is present.
- Since the field is nullable, check first before using it
- Use the `id` field if there is no `custom_id`
