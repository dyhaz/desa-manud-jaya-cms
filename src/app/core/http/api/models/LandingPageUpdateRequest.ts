/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type LandingPageUpdateRequest = {
    title: string;
    subtitle: string;
    visi: string;
    misi: string;
    about_manud_jaya: string;
    logo_image?: string;
    aparat_desa?: Array<{
photo: string;
name: string;
position: string;
}>;
};
