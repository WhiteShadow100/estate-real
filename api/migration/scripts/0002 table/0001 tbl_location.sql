CREATE TABlE IF NOT EXISTS tbl_location (
    uid UUID DEFAULT gen_random_uuid(),
    id SERIAL,
    
    label VARCHAR(500) NOT NULL,
    
    created_date TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    status enum_status NOT NULL DEFAULT 'ACTIVE'::enum_status,

    CONSTRAINT pk_tbl_location PRIMARY KEY (id),   
    CONSTRAINT unq_tbl_location_uid UNIQUE (uid)
);