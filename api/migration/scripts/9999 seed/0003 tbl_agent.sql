WITH cte_insert AS (
    SELECT
    'Mr.Cat' AS label,
    1 AS location_id,
    '1234567890' AS office_number,
    '987654321' AS phone_number,
    'mew@gmail.com' AS email

    UNION ALL

    SELECT
    'Mr.Dog' AS label,
    1 AS location_id,
    '1234567890' AS office_number,
    '987654321' AS phone_number,
    'mew@gmail.com' AS email
)

INSERT INTO tbl_agent (label, location_id, office_number, phone_number, email)
SELECT * FROM cte_insert;