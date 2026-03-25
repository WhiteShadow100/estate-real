WITH cte_insert AS (
    SELECT
    'Awsome Banglow' AS label,
    1 AS location_id,
    1 AS agent_id,
    'Modern and well-designed property featuring bright interiors and a spacious open-plan layout. Large windows bring in natural light, creating a warm and inviting atmosphere. The kitchen offers ample storage and quality fittings, while the bedrooms provide comfort and privacy. A small outdoor area adds space for relaxation or gatherings. Located in a quiet neighborhood with easy access to schools, shops, and public transport, this home is ideal for convenient and comfortable living.' AS description,
    1 AS bed_count,
    1 AS bath_count,
    200.52 AS area,
    10000 AS price,
    1 AS property_type_id,
    'awsome' AS keyword

    UNION ALL

    SELECT
    'Big Banglow' AS label,
    2 AS location_id,
    1 AS agent_id,
    'Charming property offering a perfect balance of comfort and functionality. The home features a cozy living area, well-equipped kitchen, and generously sized bedrooms filled with natural light. Designed for practical living, it also includes a private outdoor space for relaxation. Situated in a convenient location close to local markets, schools, and essential services, this property is ideal for families or individuals seeking a welcoming and accessible home environment.' AS description,
    1 AS bed_count,
    1 AS bath_count,
    200.52 AS area,
    10000 AS price,
    1 AS property_type_id,
    'big' AS keyword

    UNION ALL

    SELECT
    'Samll Banglow' AS label,
    3 AS location_id,
    1 AS agent_id,
    'Stylish and contemporary property with a thoughtfully planned layout and modern finishes. The open living and dining area creates a spacious feel, complemented by a functional kitchen with ample storage. Bedrooms are comfortable and well-lit, offering a peaceful retreat. The property also includes outdoor space suitable for leisure or small gatherings. Located near key amenities and transport links, it provides an excellent combination of comfort, convenience, and modern living.' AS description,
    1 AS bed_count,
    1 AS bath_count,
    200.52 AS area,
    10000 AS price,
    1 AS property_type_id,
    'small' AS keyword

    UNION ALL

    SELECT
    'Awsome Banglow' AS label,
    1 AS location_id,
    2 AS agent_id,
    'Modern and well-designed property featuring bright interiors and a spacious open-plan layout. Large windows bring in natural light, creating a warm and inviting atmosphere. The kitchen offers ample storage and quality fittings, while the bedrooms provide comfort and privacy. A small outdoor area adds space for relaxation or gatherings. Located in a quiet neighborhood with easy access to schools, shops, and public transport, this home is ideal for convenient and comfortable living.' AS description,
    1 AS bed_count,
    1 AS bath_count,
    200.52 AS area,
    10000 AS price,
    1 AS property_type_id,
    'awsome' AS keyword

    UNION ALL

    SELECT
    'Big Banglow' AS label,
    2 AS location_id,
    2 AS agent_id,
    'Charming property offering a perfect balance of comfort and functionality. The home features a cozy living area, well-equipped kitchen, and generously sized bedrooms filled with natural light. Designed for practical living, it also includes a private outdoor space for relaxation. Situated in a convenient location close to local markets, schools, and essential services, this property is ideal for families or individuals seeking a welcoming and accessible home environment.' AS description,
    2 AS bed_count,
    2 AS bath_count,
    200.52 AS area,
    30000 AS price,
    2 AS property_type_id,
    'big' AS keyword

    UNION ALL
    
    SELECT
    'Samll Banglow' AS label,
    3 AS location_id,
    2 AS agent_id,
    'Stylish and contemporary property with a thoughtfully planned layout and modern finishes. The open living and dining area creates a spacious feel, complemented by a functional kitchen with ample storage. Bedrooms are comfortable and well-lit, offering a peaceful retreat. The property also includes outdoor space suitable for leisure or small gatherings. Located near key amenities and transport links, it provides an excellent combination of comfort, convenience, and modern living.' AS description,
    3 AS bed_count,
    3 AS bath_count,
    200.52 AS area,
    200000 AS price,
    1 AS property_type_id,
    'small' AS keyword

    UNION ALL

    SELECT
    'Awsome Banglow' AS label,
    1 AS location_id,
    1 AS agent_id,
    'Modern and well-designed property featuring bright interiors and a spacious open-plan layout. Large windows bring in natural light, creating a warm and inviting atmosphere. The kitchen offers ample storage and quality fittings, while the bedrooms provide comfort and privacy. A small outdoor area adds space for relaxation or gatherings. Located in a quiet neighborhood with easy access to schools, shops, and public transport, this home is ideal for convenient and comfortable living.' AS description,
    1 AS bed_count,
    1 AS bath_count,
    200.52 AS area,
    10000 AS price,
    1 AS property_type_id,
    'awsome' AS keyword

    UNION ALL

    SELECT
    'Big Banglow' AS label,
    2 AS location_id,
    1 AS agent_id,
    'Charming property offering a perfect balance of comfort and functionality. The home features a cozy living area, well-equipped kitchen, and generously sized bedrooms filled with natural light. Designed for practical living, it also includes a private outdoor space for relaxation. Situated in a convenient location close to local markets, schools, and essential services, this property is ideal for families or individuals seeking a welcoming and accessible home environment.' AS description,
    1 AS bed_count,
    1 AS bath_count,
    200.52 AS area,
    10000 AS price,
    1 AS property_type_id,
    'big' AS keyword

    UNION ALL
    
    SELECT
    'Samll Banglow' AS label,
    3 AS location_id,
    1 AS agent_id,
    'Stylish and contemporary property with a thoughtfully planned layout and modern finishes. The open living and dining area creates a spacious feel, complemented by a functional kitchen with ample storage. Bedrooms are comfortable and well-lit, offering a peaceful retreat. The property also includes outdoor space suitable for leisure or small gatherings. Located near key amenities and transport links, it provides an excellent combination of comfort, convenience, and modern living.' AS description,
    1 AS bed_count,
    1 AS bath_count,
    200.52 AS area,
    10000 AS price,
    1 AS property_type_id,
    'small' AS keyword
)

INSERT INTO tbl_property (label, location_id, agent_id, description, bed_count, bath_count, area, price, property_type_id, keyword)
SELECT * FROM cte_insert;