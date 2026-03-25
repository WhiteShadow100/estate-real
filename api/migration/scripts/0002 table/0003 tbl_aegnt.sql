CREATE TABlE tbl_agent (
    uid UUID DEFAULT gen_random_uuid(),
    id SERIAL,

    label VARCHAR(500) NOT NULL,
    location_id INT NOT NULL,
    office_number VARCHAR(20) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    email VARCHAR(500) NOT NULL,
    
    created_date TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    status enum_status NOT NULL DEFAULT 'ACTIVE'::enum_status,

    CONSTRAINT pk_tbl_agent PRIMARY KEY (id),   
    CONSTRAINT unq_tbl_agent_uid UNIQUE (uid),
    CONSTRAINT fk_agent_location_id FOREIGN KEY (location_id) REFERENCES tbl_location(id)
);