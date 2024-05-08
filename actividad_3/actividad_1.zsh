#!/bin/zsh

# Guardar el argumento pasado al script en una variable
arg=$1

# Función para mostrar información del sistema
show_system_info() {
    echo "Información del Sistema:"
    uname -a  # Información del kernel
    df -h     # Uso del disco
    echo "Memoria (vm_stat):"
    vm_stat | grep "Pages free:"  # Páginas libres de memoria
    who      # Usuarios logueados
    echo "Carga del sistema:"
    uptime    # Tiempo desde que el sistema fue encendido y carga
    echo "Rutas de red:"
    netstat -r  # Tabla de enrutamiento
    echo "Configuración de red activa:"
    ifconfig | grep inet  # Muestra direcciones IP asignadas
    echo "Sistemas de archivos montados:"
    mount | grep -v 'system'  # Lista de sistemas de archivos montados, excluyendo entradas de sistema
    echo "Variables de entorno relevantes:"
    printenv | grep -E 'PATH|SHELL|HOME'  # Muestra variables de entorno específicas
}

# Función para monitorear el sistema en un bucle
monitor_system() {
    while true; do
        clear
        echo "Monitoreo del Sistema (actualiza cada 5 segundos):"
        date
        df -h
        echo "Memoria (vm_stat):"
        vm_stat | grep "Pages free:"
        who
        uptime
        netstat -r
        ifconfig | grep inet
        mount | grep -v 'system'
        printenv | grep -E 'PATH|SHELL|HOME'
        sleep 5
    done
}

# Verificar si el argumento es un número
if [[ $arg =~ ^-?[0-9]+$ ]]; then
    # Si el argumento es un número, evaluar su valor
    if [[ $arg -eq 1 ]]; then
        show_system_info
    elif [[ $arg -eq 2 ]]; then
        monitor_system
    else
        echo "Error: Número de argumento no válido. Usa '1' para información del sistema o '2' para monitoreo."
        exit 1
    fi
else
    echo "Error: El argumento proporcionado no es un número válido."
    exit 1
fi
