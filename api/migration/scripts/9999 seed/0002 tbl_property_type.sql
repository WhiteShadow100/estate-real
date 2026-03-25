WITH cte_insert AS (
    SELECT 'Apartment' AS label
    UNION ALL 
    SELECT 'Land'
    UNION ALL
    SELECT 'House'
)
INSERT INTO tbl_property_type (label)
SELECT label FROM cte_insert;