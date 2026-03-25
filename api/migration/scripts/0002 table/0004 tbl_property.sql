CREATE TABlE tbl_property (
    uid UUID DEFAULT gen_random_uuid(),
    id SERIAL,

    label VARCHAR(500) NOT NULL,
    location_id INT NOT NULL,
    agent_id INT NOT NULL,
    description VARCHAR(500) NOT NULL DEFAULT '',
    bed_count INT NOT NULL DEFAULT 0,
    bath_count INT NOT NULL DEFAULT 0,
    area NUMERIC(12, 2) NOT NULL,
    price NUMERIC(12, 2) NOT NULL,
    property_type_id INT NOT NULL,
    keyword VARCHAR(100) NOT NULL,
    
    created_date TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    status enum_status NOT NULL DEFAULT 'ACTIVE'::enum_status,

    CONSTRAINT pk_tbl_property PRIMARY KEY (id),   
    CONSTRAINT unq_tbl_property_uid UNIQUE (uid), 
    CONSTRAINT fk_property_property_type_id FOREIGN KEY (property_type_id) REFERENCES tbl_property_type(id),
    CONSTRAINT fk_property_location_id FOREIGN KEY (location_id) REFERENCES tbl_location(id),
    CONSTRAINT fk_property_agent_id FOREIGN KEY (agent_id) REFERENCES tbl_agent(id)
);