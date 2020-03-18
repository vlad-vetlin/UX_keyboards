#include <X11/Xlib.h>
#include <stdio.h>
#include <stdlib.h>

#define XF86XK_AudioRaiseVolume  0x1008FF13
#define XF86AudioPlay 0x1008ff14
#define XF86AudioNext 0x1008ff17
#define XF86AudioPrev 0x1008ff16
#define XF86AudioStop 0x1008ff15
#define XF86Switch_VT_1 0x1008fe01
#define XF86AudioMute 0x1008ff12
#define XF86AudioLowerVolume 0x1008ff11
#define XF86AudioRaiseVolume 0x1008ff13
#define XF86AudioForward 0x1008ff97

int main()
{
    Display *display;
    Window window;
    XEvent event;
    int s;

    /* open connection with the server */
    display = XOpenDisplay(NULL);
    if (display == NULL)
    {
        fprintf(stderr, "Cannot open display\n");
        exit(1);
    }

    s = DefaultScreen(display);


    /* create window */
    window = XCreateSimpleWindow(display, RootWindow(display, s), 10, 10, 200, 200, 1,
                                 BlackPixel(display, s), WhitePixel(display, s));

    /* select kind of events we are interested in */
    XSelectInput(display, window, KeyPressMask | KeyReleaseMask | ButtonPressMask | ControlMask | ButtonMotionMask | OwnerGrabButtonMask);

    XKeysymToKeycode(display, XF86AudioNext);
    XKeysymToKeycode(display, XF86AudioPlay);
    XKeysymToKeycode(display, XF86AudioPrev);
    XKeysymToKeycode(display, XF86AudioStop);
    XKeysymToKeycode(display, XF86AudioMute);
    XKeysymToKeycode(display, XF86AudioLowerVolume);
    XKeysymToKeycode(display, XF86AudioRaiseVolume);
    XKeysymToKeycode(display, XF86AudioForward);

    /* map (show) the window */
    XMapWindow(display, window);

    /* event loop */
    while (1)
    {
        XNextEvent(display, &event);

        printf("test");


        /* keyboard events */
        if (event.type == KeyPress || event.type == ButtonPress)
        {
            printf( "KeyPress: %x\n", event.xkey.keycode);

            /* exit on ESC key press */
            if ( event.xkey.keycode == 0x09 )
                break;
        }
        else if (event.type == KeyRelease)
        {
            printf( "KeyRelease: %x\n", event.xkey.keycode );
        }
    }

    /* close connection to server */
    XCloseDisplay(display);

    return 0;
}

// увеличить громкость - f3
// уменьшить f2
// следующая аудио f6