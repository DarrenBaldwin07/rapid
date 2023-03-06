import { expect, test } from 'vitest';
import {render, screen} from '@testing-library/react'
import { Button } from '../../../src/components/primitives';
import React from 'react';

test('that the component renders correctly', async () => {
    const root = render(<Button>Hello world</Button>)
    expect(root).toBeDefined()
})
