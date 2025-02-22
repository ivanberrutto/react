package com.example.myapp.repositories;

import com.example.myapp.models.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
    // Aquí podrías agregar consultas personalizadas
}