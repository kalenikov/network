import React, {Fragment} from 'react';
import ProfileStatus from './ProfileStatus'
import {create} from 'react-test-renderer'

describe('Profile status component', () => {
    test('status from props should be in the state', () => {
        const component = create(<ProfileStatus status={'мой статус'}/>)
        const instance = component.getInstance()
        expect(instance.state.status).toBe('мой статус')
    });
    test('after creation span should be displayed', () => {
        const component = create(<ProfileStatus status={'мой статус'}/>)
        const root = component.root
        let span = root.findByType('span')
        expect(span).not.toBeNull()
    });
    test('input null', () => {
        const component = create(<ProfileStatus status={'мой статус'}/>)
        const root = component.root
        expect(() => {
            root.findByType('input')
        }).toThrow()
    });
    test('span should be contain correct status', () => {
        const component = create(<ProfileStatus status={'мой статус'}/>)
        const root = component.root
        let span = root.findByType('span')
        expect(span.children[0]).toBe('мой статус')
    });
    test('input should be displayed in editMode instead span', () => {
        const component = create(<ProfileStatus status={'мой статус'}/>)
        const root = component.root
        let span = root.findByType('span')
        span.props.onDoubleClick()
        let input = root.findByType('input')
        expect(input.props.value).toBe('мой статус')
    });
    test('callback should be called', () => {
        const mockCallback = jest.fn()
        const component = create(<ProfileStatus
            status={'мой статус'}
            updateStatus={mockCallback}/>)
        const instance = component.getInstance()
        instance.deactivateEditMode()
        expect(mockCallback.mock.calls.length).toBe(1)
    });
})
