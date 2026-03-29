-- ============================================================
-- Friend's Eye Center (FEC) - Ghana/Eye Clinic Customization
-- Patient Demographics Form (DEM layout)
--
-- Apply via phpMyAdmin (http://localhost:8310/) or:
--   docker compose exec mysql mysql -u openemr -popenemr openemr < /openemr/sql/fec_ghana_customization.sql
-- ============================================================

-- ============================================================
-- 1. Add Ghana Regions list
--    (replaces US States dropdown for the "State" field)
-- ============================================================

-- Register the list in the lists meta-table
INSERT IGNORE INTO `list_options` (`list_id`, `option_id`, `title`, `seq`, `is_default`, `option_value`, `activity`)
VALUES ('lists', 'ghana_region', 'Ghana Regions', 200, 0, 0, 1);

-- Ghana's 16 administrative regions
INSERT IGNORE INTO `list_options` (`list_id`, `option_id`, `title`, `seq`, `is_default`, `option_value`, `activity`) VALUES
('ghana_region', 'AH', 'Ahafo',         10,  0, 0, 1),
('ghana_region', 'AS', 'Ashanti',        20,  0, 0, 1),
('ghana_region', 'BO', 'Bono',           30,  0, 0, 1),
('ghana_region', 'BE', 'Bono East',      40,  0, 0, 1),
('ghana_region', 'CR', 'Central',        50,  0, 0, 1),
('ghana_region', 'EA', 'Eastern',        60,  0, 0, 1),
('ghana_region', 'GA', 'Greater Accra',  70,  1, 0, 1),
('ghana_region', 'NE', 'North East',     80,  0, 0, 1),
('ghana_region', 'NO', 'Northern',       90,  0, 0, 1),
('ghana_region', 'OT', 'Oti',           100,  0, 0, 1),
('ghana_region', 'SA', 'Savannah',      110,  0, 0, 1),
('ghana_region', 'UE', 'Upper East',    120,  0, 0, 1),
('ghana_region', 'UW', 'Upper West',    130,  0, 0, 1),
('ghana_region', 'VO', 'Volta',         140,  0, 0, 1),
('ghana_region', 'WE', 'Western',       150,  0, 0, 1),
('ghana_region', 'WN', 'Western North', 160,  0, 0, 1);

-- ============================================================
-- 2. Add Referral Source list (eye clinic specific)
-- ============================================================

INSERT IGNORE INTO `list_options` (`list_id`, `option_id`, `title`, `seq`, `is_default`, `option_value`, `activity`)
VALUES ('lists', 'referral_source', 'Referral Source', 201, 0, 0, 1);

INSERT IGNORE INTO `list_options` (`list_id`, `option_id`, `title`, `seq`, `is_default`, `option_value`, `activity`) VALUES
('referral_source', 'self',      'Self / Walk-in',                    10, 1, 0, 1),
('referral_source', 'gp',        'General Practitioner / Doctor',     20, 0, 0, 1),
('referral_source', 'hospital',  'Hospital / Clinic',                 30, 0, 0, 1),
('referral_source', 'optician',  'Optician / Optometrist',            40, 0, 0, 1),
('referral_source', 'chps',      'CHPS / Community Health Worker',    50, 0, 0, 1),
('referral_source', 'school',    'School Screening',                  60, 0, 0, 1),
('referral_source', 'family',    'Family / Friend',                   70, 0, 0, 1),
('referral_source', 'employer',  'Employer Screening',                80, 0, 0, 1),
('referral_source', 'other',     'Other',                             90, 0, 0, 1);

-- ============================================================
-- 3. Add NHIS Payment Type options to pricelevel list
-- ============================================================

-- Remove US-style default entries if present, then add Ghana-relevant ones
DELETE FROM `list_options` WHERE `list_id` = 'pricelevel' AND `option_id` IN ('low', 'standard');

INSERT IGNORE INTO `list_options` (`list_id`, `option_id`, `title`, `seq`, `is_default`, `option_value`, `activity`) VALUES
('pricelevel', 'cash',      'Cash / Out of Pocket',              10, 1, 0, 1),
('pricelevel', 'nhis',      'NHIS (Nat. Health Insurance)',      20, 0, 0, 1),
('pricelevel', 'corporate', 'Corporate / Employer Insurance',    30, 0, 0, 1),
('pricelevel', 'waiver',    'Waiver / Free Care',                40, 0, 0, 1);

-- ============================================================
-- 4. Rename/reconfigure DEM form fields for Ghana context
-- ============================================================

-- "S.S." → Ghana Card No.
UPDATE `layout_options` SET
    `title`       = 'Ghana Card No.',
    `description` = 'Ghana National Identification Authority card number'
WHERE `form_id` = 'DEM' AND `field_id` = 'ss';

-- "License/ID" → Other ID No. (Voter ID, Passport, etc.)
UPDATE `layout_options` SET
    `title`       = 'Other ID No.',
    `description` = 'Voter ID, Passport, or other identification number'
WHERE `form_id` = 'DEM' AND `field_id` = 'drivers_license';

-- "State" → Region (switch list to Ghana regions)
UPDATE `layout_options` SET
    `title`       = 'Region',
    `list_id`     = 'ghana_region',
    `description` = 'Ghana administrative region'
WHERE `form_id` = 'DEM' AND `field_id` = 'state';

-- "County" → District
UPDATE `layout_options` SET
    `title`       = 'District',
    `list_id`     = '',
    `data_type`   = 2,
    `description` = 'District or municipality'
WHERE `form_id` = 'DEM' AND `field_id` = 'county';

-- "Postal Code" → Digital Address (Ghana Post GPS)
UPDATE `layout_options` SET
    `title`       = 'Digital Address (GPS)',
    `description` = 'Ghana Post GPS digital address e.g. GA-144-1234'
WHERE `form_id` = 'DEM' AND `field_id` = 'postal_code';

-- Set country default to Ghana
UPDATE `layout_options` SET `default_value` = 'GH'
WHERE `form_id` = 'DEM' AND `field_id` = 'country_code';

-- "Payment Level" → Payment Type
UPDATE `layout_options` SET
    `title`       = 'Payment Type',
    `description` = 'Patient payment category: Cash, NHIS, Corporate, etc.'
WHERE `form_id` = 'DEM' AND `field_id` = 'pricelevel';

-- "Billing Note" → NHIS / Insurance No.
UPDATE `layout_options` SET
    `title`       = 'NHIS / Insurance No.',
    `description` = 'NHIS membership number or other insurance policy number'
WHERE `form_id` = 'DEM' AND `field_id` = 'billing_note';

-- "Mother's Name" → Emergency Contact Name
UPDATE `layout_options` SET
    `title`       = 'Emergency Contact Name',
    `description` = 'Name of next of kin or emergency contact'
WHERE `form_id` = 'DEM' AND `field_id` = 'mothersname';

-- ============================================================
-- 5. Repurpose generic fields for eye clinic / Ghana needs
-- ============================================================

-- genericname1 → Occupation (text input)
UPDATE `layout_options` SET
    `title`       = 'Occupation',
    `uor`         = 1,
    `data_type`   = 2,
    `fld_length`  = 30,
    `max_length`  = 63,
    `list_id`     = '',
    `description` = 'Patient occupation (important for eye health risk factors)'
WHERE `form_id` = 'DEM' AND `field_id` = 'genericname1';

-- genericval1 → holds occupation value; hide label, keep field
UPDATE `layout_options` SET `uor` = 0
WHERE `form_id` = 'DEM' AND `field_id` = 'genericval1';

-- genericname2 → Referred By (dropdown)
UPDATE `layout_options` SET
    `title`       = 'Referred By',
    `uor`         = 1,
    `data_type`   = 1,
    `list_id`     = 'referral_source',
    `description` = 'How the patient was referred to FEC'
WHERE `form_id` = 'DEM' AND `field_id` = 'genericname2';

-- hide genericval2 (not needed for list-type field)
UPDATE `layout_options` SET `uor` = 0
WHERE `form_id` = 'DEM' AND `field_id` = 'genericval2';

-- ============================================================
-- 6. Hide US-specific / irrelevant fields
-- ============================================================

-- Fix pricelevel to Optional (OpenEMR default is Unused)
UPDATE `layout_options` SET `uor` = 1
WHERE `form_id` = 'DEM' AND `field_id` = 'pricelevel';

UPDATE `layout_options` SET `uor` = 0
WHERE `form_id` = 'DEM' AND `field_id` IN (
    -- Western-specific identity fields not used at FEC
    'gender_identity',
    'sex_identified',
    'sexual_orientation',
    'pronoun',
    -- US immunization registry / publicity / protection fields
    'imm_reg_status', 'imm_reg_stat', 'imm_reg_stat2',
    'publicity_code', 'publicity_code_eff',
    'protect_individual', 'prot_indiv_eff_date',
    -- Deceased fields (not needed at registration)
    'deceased_date', 'deceased_reason',
    -- Care team (not used at FEC)
    'care_team',
    -- US HIPAA compliance fields (not applicable in Ghana)
    'hipaa_notice',
    'hipaa_voice',
    'hipaa_message',
    'hipaa_mail',
    'hipaa_allowsms',
    'hipaa_allowemail',
    'allow_imm_reg_use',
    'allow_imm_info_share',
    'allow_health_info_ex',
    -- Portal / system fields not relevant for FEC
    'allow_patient_portal',
    'prevent_portal_apps',
    'cmsportal_login',
    'email_direct',
    -- Not applicable
    'squad',
    'pharmacy_id'
);

-- ============================================================
-- 7. Rename layout group section headings
-- ============================================================

UPDATE `layout_group_properties` SET `grp_title` = 'Patient Information'
WHERE `grp_form_id` = 'DEM' AND `grp_group_id` = '1';

UPDATE `layout_group_properties` SET `grp_title` = 'Address & Contact'
WHERE `grp_form_id` = 'DEM' AND `grp_group_id` = '2';

UPDATE `layout_group_properties` SET `grp_title` = 'Clinic & Payment'
WHERE `grp_form_id` = 'DEM' AND `grp_group_id` = '3';

UPDATE `layout_group_properties` SET `grp_title` = 'Social & Cultural'
WHERE `grp_form_id` = 'DEM' AND `grp_group_id` = '5';

UPDATE `layout_group_properties` SET `grp_title` = 'Additional Information'
WHERE `grp_form_id` = 'DEM' AND `grp_group_id` = '6';

UPDATE `layout_group_properties` SET `grp_title` = 'Next of Kin'
WHERE `grp_form_id` = 'DEM' AND `grp_group_id` = '8';

-- ============================================================
-- 8. Add Ghana-specific dropdown lists
-- ============================================================

-- Educational Level
INSERT IGNORE INTO `list_options` (`list_id`, `option_id`, `title`, `seq`, `is_default`, `option_value`, `activity`)
VALUES ('lists', 'ghana_education', 'Educational Level (Ghana)', 202, 0, 0, 1);

INSERT IGNORE INTO `list_options` (`list_id`, `option_id`, `title`, `seq`, `is_default`, `option_value`, `activity`) VALUES
('ghana_education', 'none',       'No Formal Education',              10, 0, 0, 1),
('ghana_education', 'primary',    'Primary (Class 1–6)',              20, 0, 0, 1),
('ghana_education', 'jhs',        'Junior High School (JHS)',         30, 0, 0, 1),
('ghana_education', 'shs',        'Senior High School (SHS)',         40, 0, 0, 1),
('ghana_education', 'vocational', 'Vocational / Technical',           50, 0, 0, 1),
('ghana_education', 'tertiary',   'Tertiary / University',            60, 0, 0, 1),
('ghana_education', 'postgrad',   'Postgraduate',                     70, 0, 0, 1);

-- NHIS Membership Category
INSERT IGNORE INTO `list_options` (`list_id`, `option_id`, `title`, `seq`, `is_default`, `option_value`, `activity`)
VALUES ('lists', 'nhis_category', 'NHIS Membership Category', 203, 0, 0, 1);

INSERT IGNORE INTO `list_options` (`list_id`, `option_id`, `title`, `seq`, `is_default`, `option_value`, `activity`) VALUES
('nhis_category', 'fee_paying',   'Fee-Paying (Informal Sector)',     10, 1, 0, 1),
('nhis_category', 'ssnit',        'SSNIT Contributor',                20, 0, 0, 1),
('nhis_category', 'ssnit_pen',    'SSNIT Pensioner',                  30, 0, 0, 1),
('nhis_category', 'exempt_preg',  'Exempt – Pregnant Woman',          40, 0, 0, 1),
('nhis_category', 'exempt_child', 'Exempt – Child under 18',          50, 0, 0, 1),
('nhis_category', 'exempt_aged',  'Exempt – Person 70+',              60, 0, 0, 1),
('nhis_category', 'exempt_ind',   'Exempt – Indigent / Welfare',      70, 0, 0, 1),
('nhis_category', 'exempt_dis',   'Exempt – Differently-Abled',       80, 0, 0, 1),
('nhis_category', 'none',         'No NHIS / Uninsured',              90, 0, 0, 1);

-- Ghana Ethnic Groups
INSERT IGNORE INTO `list_options` (`list_id`, `option_id`, `title`, `seq`, `is_default`, `option_value`, `activity`)
VALUES ('lists', 'ghana_ethnicity', 'Ethnic Group (Ghana)', 204, 0, 0, 1);

INSERT IGNORE INTO `list_options` (`list_id`, `option_id`, `title`, `seq`, `is_default`, `option_value`, `activity`) VALUES
('ghana_ethnicity', 'akan',       'Akan (Ashanti, Fanti, Akyem…)',    10, 0, 0, 1),
('ghana_ethnicity', 'ewe',        'Ewe',                              20, 0, 0, 1),
('ghana_ethnicity', 'ga_adangbe', 'Ga-Adangbe',                       30, 0, 0, 1),
('ghana_ethnicity', 'dagomba',    'Mole-Dagbani (Dagomba, Mamprusi)', 40, 0, 0, 1),
('ghana_ethnicity', 'guan',       'Guan',                             50, 0, 0, 1),
('ghana_ethnicity', 'gurma',      'Gurma (Konkomba, Bimoba)',         60, 0, 0, 1),
('ghana_ethnicity', 'mande',      'Mande (Wala, Sissala)',            70, 0, 0, 1),
('ghana_ethnicity', 'other',      'Other',                            80, 0, 0, 1),
('ghana_ethnicity', 'foreign',    'Non-Ghanaian',                     90, 0, 0, 1);

-- Add missing Ghana languages to existing language list
INSERT IGNORE INTO `list_options` (`list_id`, `option_id`, `title`, `seq`, `is_default`, `option_value`, `activity`) VALUES
('language', 'ga',       'Ga',       5,  0, 0, 1),
('language', 'dagbani',  'Dagbani',  6,  0, 0, 1),
('language', 'fanti',    'Fanti',    7,  0, 0, 1),
('language', 'nzema',    'Nzema',    8,  0, 0, 1),
('language', 'kasem',    'Kasem',    9,  0, 0, 1);

-- ============================================================
-- 9. Configure Group 5 (Social & Cultural) fields for Ghana
-- ============================================================

-- Language — already exists with good list, just ensure it's visible
UPDATE `layout_options` SET `uor` = 1, `title` = 'Preferred Language'
WHERE `form_id` = 'DEM' AND `field_id` = 'language';

-- Ethnicity → Ghana Ethnic Group
UPDATE `layout_options` SET
    `title`   = 'Ethnic Group',
    `list_id` = 'ghana_ethnicity',
    `uor`     = 1,
    `data_type` = 1,
    `description` = 'Patient ethnic group or tribe'
WHERE `form_id` = 'DEM' AND `field_id` = 'ethnicity';

-- Race → hide (not a meaningful category in Ghana context)
UPDATE `layout_options` SET `uor` = 0
WHERE `form_id` = 'DEM' AND `field_id` = 'race';

-- Nationality → keep, already good
UPDATE `layout_options` SET `uor` = 1
WHERE `form_id` = 'DEM' AND `field_id` = 'nationality_country';

-- Religion — already exists with broad list, keep visible
UPDATE `layout_options` SET `uor` = 1
WHERE `form_id` = 'DEM' AND `field_id` = 'religion';

-- Tribal Affiliations → hide (replaced by Ethnic Group above)
UPDATE `layout_options` SET `uor` = 0
WHERE `form_id` = 'DEM' AND `field_id` = 'tribal_affiliations';

-- Interpreter Needed → keep (useful for multilingual context)
UPDATE `layout_options` SET `uor` = 1
WHERE `form_id` = 'DEM' AND `field_id` = 'interpreter_needed';

-- Hide US social determinant fields not relevant for FEC
UPDATE `layout_options` SET `uor` = 0
WHERE `form_id` = 'DEM' AND `field_id` IN (
    'financial_review', 'family_size', 'monthly_income',
    'homeless', 'migrantseasonal', 'contrastart',
    'referral_source', 'vfc', 'interpreter'
);

-- ============================================================
-- 10. Configure Group 6 (Additional Information) fields
-- ============================================================

-- usertext1 → Hometown / Place of Origin
UPDATE `layout_options` SET
    `title`      = 'Hometown / Place of Origin',
    `uor`        = 1,
    `fld_length` = 30,
    `max_length` = 63,
    `description` = 'Patient hometown or place of origin'
WHERE `form_id` = 'DEM' AND `field_id` = 'usertext1';

-- usertext2 → Community / Village
UPDATE `layout_options` SET
    `title`      = 'Community / Village',
    `uor`        = 1,
    `fld_length` = 30,
    `max_length` = 63,
    `description` = 'Specific community or village (for rural patients)'
WHERE `form_id` = 'DEM' AND `field_id` = 'usertext2';

-- usertext3 → SSNIT Number
UPDATE `layout_options` SET
    `title`      = 'SSNIT Number',
    `uor`        = 1,
    `fld_length` = 20,
    `max_length` = 30,
    `description` = 'Social Security and National Insurance Trust number'
WHERE `form_id` = 'DEM' AND `field_id` = 'usertext3';

-- usertext4 → NHIS Expiry Date (stored as text MM/YYYY)
UPDATE `layout_options` SET
    `title`      = 'NHIS Expiry Date',
    `uor`        = 1,
    `fld_length` = 10,
    `max_length` = 10,
    `description` = 'NHIS card expiry date (MM/YYYY)'
WHERE `form_id` = 'DEM' AND `field_id` = 'usertext4';

-- userlist1 → Educational Level
UPDATE `layout_options` SET
    `title`   = 'Educational Level',
    `uor`     = 1,
    `list_id` = 'ghana_education',
    `data_type` = 1,
    `description` = 'Highest level of education completed'
WHERE `form_id` = 'DEM' AND `field_id` = 'userlist1';

-- userlist2 → NHIS Membership Category
UPDATE `layout_options` SET
    `title`   = 'NHIS Category',
    `uor`     = 1,
    `list_id` = 'nhis_category',
    `data_type` = 1,
    `description` = 'NHIS membership exemption or contribution category'
WHERE `form_id` = 'DEM' AND `field_id` = 'userlist2';

-- Registration Date → show (useful for tracking)
UPDATE `layout_options` SET `uor` = 1, `title` = 'Registration Date'
WHERE `form_id` = 'DEM' AND `field_id` = 'regdate';

-- Hide remaining unused user fields
UPDATE `layout_options` SET `uor` = 0
WHERE `form_id` = 'DEM' AND `field_id` IN (
    'usertext5','usertext6','usertext7','usertext8',
    'userlist3','userlist4','userlist5','userlist6','userlist7'
);

-- ============================================================
-- 11. Configure Group 8 (Next of Kin) fields for Ghana
-- ============================================================

-- Rename "Name" → "Next of Kin Name"
UPDATE `layout_options` SET `title` = 'Next of Kin Name'
WHERE `form_id` = 'DEM' AND `field_id` = 'guardiansname';

-- Rename "State" → "Region" with Ghana regions list
UPDATE `layout_options` SET
    `title`   = 'Region',
    `list_id` = 'ghana_region',
    `data_type` = 26
WHERE `form_id` = 'DEM' AND `field_id` = 'guardianstate';

-- Rename "Postal Code" → "Digital Address (GPS)"
UPDATE `layout_options` SET `title` = 'Digital Address (GPS)'
WHERE `form_id` = 'DEM' AND `field_id` = 'guardianpostalcode';

-- Set Next of Kin country default to Ghana
UPDATE `layout_options` SET `default_value` = 'GH'
WHERE `form_id` = 'DEM' AND `field_id` = 'guardiancountry';
