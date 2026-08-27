# Lowe's Business Card Scanner

Mobile-first Power Apps canvas app for photographing a business card, extracting contact data with AI Builder, checking SharePoint for likely duplicates, and either updating the existing record or creating a new one.

## Branding

The app uses the Lowe's design-system tokens in this repository:

- Ink: `#071D49`
- Brand blue: `#0033A1`
- Action blue: `#0071CE`
- Light blue: `#9BCBEB`
- Success green: `#007935`
- Canvas gray: `#F6F7F9`

Power Apps does not reliably expose custom Fellix font files in a portable canvas app, so the app uses Segoe UI, which is the fallback font in the Lowe's design-system typography stack. No font files are packaged into the app.

## What it does

1. The user takes or selects a photo of a business card on a phone.
2. The app calls the AI Builder **Business card reader** model once.
3. The extracted fields are shown in editable review screens.
4. The app checks the SharePoint list for a likely existing contact in this order:
   - exact normalized email match
   - exact normalized phone match
   - exact normalized first name + last name + company match
5. If a match exists, the user can **Update existing** or **Save as new**.
6. Updating is conservative: blank values from the new scan do not overwrite populated values in the existing record.

The business-card image itself is not written to SharePoint.

## SharePoint list

The app expects its SharePoint data source to be named `BusinessCards` inside Power Apps. The recommended columns are in `sharepoint-columns.csv`.

The three helper columns below should be indexed in SharePoint for the best duplicate-check performance:

- `EmailKey`
- `PhoneKey`
- `NameCompanyKey`

Do not make `PhoneKey` unique. Multiple people can legitimately share a business number.

The built-in SharePoint `Title` column is used for the company name.

## Connect after opening the app

### 1. Open the `.msapp`

In Power Apps Studio, use **File > Open > Browse**, choose `LowesBusinessCardScanner.msapp`, and save a copy into your environment.

### 2. Add the AI Builder model

In the app, select **Data > Add data > AI models**, then add **Business card reader**.

AI Builder requires the appropriate Power Platform environment permissions and AI Builder capacity/license. Microsoft also requires AI models to be added again when an app is moved into a different environment.

### 3. Add the SharePoint list

Select **Data > Add data > SharePoint**, connect to the site, and select the contact list.

If the list is already named `BusinessCards`, the formulas should bind directly after the data source is added.

If the SharePoint list has a different name, replace the `BusinessCards` data-source references in the app formulas with the connected list name. Keep the column internal names shown in `sharepoint-columns.csv`, or update the field mapping in the two `Patch()` formulas and three `LookUp()` formulas.

## Duplicate keys

The app creates keys as follows:

- `EmailKey`: lowercase trimmed email
- `PhoneKey`: mobile phone when available, otherwise business phone; spaces, parentheses, hyphens, periods, and `+` are removed
- `NameCompanyKey`: lowercase `FirstName|LastName|Company`

This approach avoids fuzzy automatic merges. A possible match is surfaced to the user, and the user decides whether it is the same person.

## Notes

- AI extraction is intentionally followed by a review step because business-card OCR can be incomplete or inaccurate.
- The app is designed for a 640 x 1136 portrait phone canvas and scales to the device.
- The source is kept on the `chatgpt/business-card-scanner` branch so the core branding repository remains untouched.
