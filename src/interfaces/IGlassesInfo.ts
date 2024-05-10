export enum PrescriptionType {
    None = 'None',
    Trifocals = 'Trifocals',
    Bifocals = 'Bifocals    ',
    Progressives = 'Progressives',
}
export enum MaterialType {
    None = 'None',
    Wood = 'Wood',
    BioBased = 'Bio-Based',
    Recycled = 'Recycled Plastic',
}

export interface IGlassesInfo {
    material?: MaterialType;
    prescriptionType?: PrescriptionType;
    frameColor?: string;
    lensColor?: string;
}
