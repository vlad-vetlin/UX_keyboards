cmake_minimum_required(VERSION 3.15)
project(C C)

set(CMAKE_C_STANDARD 11)
set(GCC_CXX_FLAGS "${GCC_CXX_FLAGS} -lX11")

find_package(X11 REQUIRED)

message(STATUS "X11_FOUND = ${X11_FOUND}")
message(STATUS "X11_INCLUDE_DIR = ${X11_INCLUDE_DIR}")
message(STATUS "X11_LIBRARIES = ${X11_LIBRARIES}")

include_directories(${X11_INCLUDE_DIR})
link_directories(${X11_LIBRARIES})

add_executable(C main.c)

target_link_libraries(C ${X11_LIBRARIES} -lX11)