import { animate, animateChild, query, style, transition, trigger, group } from '@angular/animations';

export const slideAnimation = 
    trigger('routeAnimations', [
        transition(
            'TypeAll => TypeNowPlaying, TypeNowPlaying => TypeComingSoon, TypeComingSoon => TypeTopRated, TypeAll => TypeComingSoon, TypeAll => TypeTopRated, TypeNowPlaying => TypeTopRated', 
            [
                style({ position: 'relative' }),
                query(':enter, :leave', [
                style({
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '100%'
                })
                ]),
                query(':enter', [style({ right: '-100%', opacity: 0 })]),
                query(':leave', animateChild()),
                group([
                query(':leave', [animate('.6s ease-out', style({ right: '100%', opacity: 0 }))]),
                query(':enter', [animate('.6s ease-out', style({ right: '0%', opacity: 1 }))])
                ]),
                query(':enter', animateChild())      
            ]),
        transition(
            'TypeNowPlaying => TypeAll, TypeComingSoon => TypeNowPlaying, TypeComingSoon => TypeAll, TypeTopRated => TypeComingSoon, TypeTopRated => TypeNowPlaying, TypeTopRated => TypeAll', 
            [
                style({ position: 'relative' }),
                query(':enter, :leave', [
                style({
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%'
                })
                ]),
                query(':enter', [style({ left: '-100%', opacity: 0 })]),
                query(':leave', animateChild()),
                group([
                query(':leave', [animate('.6s ease-out', style({ left: '100%', opacity: 0 }))]),
                query(':enter', [animate('.6s ease-out', style({ left: '0%', opacity: 1 }))])
                ]),
                query(':enter', animateChild())      
            ]),
    ])