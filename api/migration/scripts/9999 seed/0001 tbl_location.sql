WITH cte_insert AS (
    SELECT '123 Street, Imadol, Lalitpur' AS label
    UNION ALL 
    SELECT '123 Street, Basantapur, Kathmandu'
    UNION ALL
    SELECT '123 Street, Wochu, Lalitpur'
    UNION ALL
    SELECT '123 Street, Halumandhoka, Kathmandu'
)
INSERT INTO tbl_location (label)
SELECT label FROM cte_insert;