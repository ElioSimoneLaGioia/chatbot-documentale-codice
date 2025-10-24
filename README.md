[note-di-rilascio.md](https://github.com/user-attachments/files/23121154/note-di-rilascio.md)
# Release Notes: CRM System - Version 2.0

## Summary
This release significantly enhances the CRM system by introducing multichannel support for invoicing, robust tax calculation capabilities, and improved client management. The system can now differentiate between 'retail' and 'online' sales, automatically apply taxes, and provide a summary of sales performance by channel. Invoice identification has also been improved with the adoption of UUIDs.

## What's Changed
*   **Multichannel Invoicing**: Invoices can now be generated for both 'retail' and 'online' channels.
*   **Automatic Tax Calculation**: Implemented automatic 22% IVA calculation for online invoices.
*   **Enhanced Client Information**: Added the ability to store client addresses.
*   **Unique Invoice IDs**: Switched to universally unique identifiers (UUIDs) for invoice IDs.
*   **Sales Reporting**: Introduced a new feature to summarize sales performance per channel.
*   **Improved Invoice Display**: Invoice printouts now reflect channel, net amount, taxes, and total.

## New Features
*   **Multichannel Support**: The `Fattura` class and `genera_fattura` method now accept a `canale` parameter (e.g., "retail", "online") to categorize invoices.
*   **Tax Management**: Invoices now include a `tasse` attribute, and the `genera_fattura` method automatically calculates 22% VAT for 'online' transactions.
*   **Client Address Field**: The `Cliente` class and `aggiungi_cliente` method now support an optional `indirizzo` (address) field.
*   **UUID-based Invoice IDs**: Invoice IDs are no longer sequential integers but are now generated using `uuid.uuid4()` for better uniqueness and scalability.
*   **`totale_con_tasse()` Method**: A new method in the `Fattura` class calculates the total amount including taxes.
*   **`riepilogo_vendite()` Method**: A new method in the `CRM` class provides a summary of total sales grouped by channel.

## Bug Fixes
No specific bug fixes were identified in this release. All changes introduce new functionality or enhancements.

## Technical Details
*   **Dependency Update**: Imported the `uuid` module for generating unique identifiers.
*   **Class Refactoring**: The `Fattura` class has been extended with `canale` and `tasse` attributes and a new `totale_con_tasse` method.
*   **Method Enhancement**: The `genera_fattura` method in the `CRM` class now includes logic for tax calculation based on the channel and generates UUIDs for invoices. It also includes a logging statement for generated invoices.
*   **Output Formatting**: The `stampa_fattura` method has been updated to display more detailed information, including the channel, net amount, taxes, and the final total amount.
