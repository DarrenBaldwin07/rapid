import { ComponentType } from 'react';
export type ClassValue = string | null | undefined | ClassValue[];
export type ExtractProps<T> = T extends ComponentType<infer P> ? P : T;
export type Spacing = 'sm' | 'md' | 'lg';
