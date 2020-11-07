import { animate, animateChild, query, style, transition, trigger, group } from '@angular/animations';

export const animations = 
    trigger('routeAnimations', [
        transition('TypeAll => TypeNowPlaying, TypeNowPlaying => TypeComingSoon, TypeComingSoon => TypeTopRated, TypeAll => TypeComingSoon, TypeAll => TypeTopRated, TypeNowPlaying => TypeTopRated, Login => Signup', slideTo('right')),
        transition('TypeNowPlaying => TypeAll, TypeComingSoon => TypeNowPlaying, TypeComingSoon => TypeAll, TypeTopRated => TypeComingSoon, TypeTopRated => TypeNowPlaying, TypeTopRated => TypeAll, Signup => Login', slideTo('left')),
        transition('Homepage <=> *, * <=> MovieDetails, Home <=> *, Admin <=> *, Auth <=> *, ProfileDetails <=> *, AllNews <=> *, NewsDetails <=> *, NewsCategory <=> *, AdminCredentials <=> *, MovieType <=> *, MovieCategory <=> *', fadeEffect()),
    ]);

function slideTo(direction: string) {
    const optional = { optional: true };
    return [
        style({ position: 'relative'}),

        query(':enter, :leave', [
            style({
                position: 'absolute',
                top: 0,
                [direction]: 0,
                width: '100%'
            })
        ], optional),

        query(':enter', [
            style({ [direction]: '-100%', opacity: 1 })
        ]),

        group([
            query(':leave', [
                animate('700ms ease-out', style({ [direction]: '100%', opacity: 0}))
            ], optional),
            query(':enter', [
                animate('700ms ease-out', style({ [direction]: '0%', opacity: 1}))
            ])

        ])
    ];
}

function fadeEffect() {
    const optional = { optional: true};

    return [
        query(':leave', style({ position: 'absolute', left: 0, right: 0, opacity: 1 }), optional),
        query(':enter', style({ position: 'absolute', left: 0, right: 0, opacity: 0 }), optional),
        query(':leave', animate('500ms ease-out', style({ opacity: 0 })), optional),
        query(':enter', animate('500ms ease-out', style({ opacity: 1 })), optional)
    ];
}