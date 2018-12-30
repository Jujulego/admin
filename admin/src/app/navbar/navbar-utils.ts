export declare type NavbarPosition = 'top' | 'sidebar';
export declare type NavbarMultiplePosition = NavbarPosition | NavbarPosition[]

export function isPosArray(val: NavbarMultiplePosition): val is NavbarPosition[] {
    return (<NavbarPosition[]> val).indexOf !== undefined;
}