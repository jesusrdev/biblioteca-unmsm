package org.cibertec.backend.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "personal_information")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class PersonalInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "info_id")
    private int infoId;

    @Column(name = "code", length = 10, nullable = false, unique = true)
    private String code;

    @Column(name = "first_name", length = 100, nullable = false)
    private String firstName;

    @Column(name = "last_name", length = 100, nullable = false)
    private String lastName;

    @Column(name = "dni", length = 8, nullable = false, unique = true)
    private String dni;

    @Column(name = "phone_number", length = 9)
    private String phoneNumber;

    @Column(name = "email", length = 100, nullable = false)
    private String email;

    @Column(name = "direction")
    private String direction;

    @Column(name = "job_title", nullable = false)
    private String jobTitle;

    @OneToOne(mappedBy = "personalInfo", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private User user;
}
