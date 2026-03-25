CREATE TABle tbl_property_type (
    uid UUID,
    id SERIAL,

    label VARCHAR(100),    
    
    created_date TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    status enum_status NOT NULL DEFAULT 'ACTIVE'::enum_status,

    CONSTRAINT pk_tbl_property_type PRIMARY KEY (id),   
    CONSTRAINT unq_tbl_property_type_uid UNIQUE (uid)
);