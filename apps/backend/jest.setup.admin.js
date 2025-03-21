require('@testing-library/jest-dom');

// Mock browser APIs
global.window = global;
global.document = {
  createElement: () => ({
    setAttribute: () => {},
    style: {},
  }),
  querySelector: () => null,
  querySelectorAll: () => [],
  getElementById: () => null,
  getElementsByClassName: () => [],
  getElementsByTagName: () => [],
  createTextNode: () => ({}),
  body: {
    appendChild: () => {},
    removeChild: () => {},
  },
};

// Mock window.alert
global.window.alert = jest.fn();

global.navigator = {
  userAgent: 'node.js',
  clipboard: {
    writeText: jest.fn(),
    readText: jest.fn(),
  },
};

// Mock react-beautiful-dnd with simple pass-through components
jest.mock('react-beautiful-dnd', () => ({
  DragDropContext: ({ children }) => children,
  Droppable: ({ children }) => {
    if (typeof children === 'function') {
      return children({
        innerRef: () => {},
        droppableProps: {},
        placeholder: null,
      });
    }
    return children;
  },
  Draggable: ({ children }) => {
    if (typeof children === 'function') {
      return children({
        innerRef: () => {},
        draggableProps: {},
        dragHandleProps: {},
      });
    }
    return children;
  },
}));

// Mock all Strapi Design System components
jest.mock('@strapi/design-system', () => {
  const mockReact = require('react');
  
  const Dialog = {
    Root: ({ children, ref, onOpenChange, ...props }) => {
      // When the trigger is clicked, call onOpenChange to show the dialog
      const handleTriggerClick = () => {
        onOpenChange && onOpenChange(true);
      };
      
      return {
        $$typeof: Symbol.for('react.element'),
        type: 'div',
        ref: ref || null,
        props: { 
          ...props,
          children: mockReact.Children.map(children, child => {
            if (child && child.type === Dialog.Trigger) {
              return mockReact.cloneElement(child, { onClick: handleTriggerClick });
            }
            return child;
          })
        }
      };
    },
    Trigger: ({ children, ref, onClick, ...props }) => ({
      $$typeof: Symbol.for('react.element'),
      type: 'button',
      ref: ref || null,
      props: { 
        ...props,
        onClick,
        children: typeof children === 'function' ? children() : children
      }
    }),
    Content: ({ children, ref, ...props }) => ({
      $$typeof: Symbol.for('react.element'),
      type: 'div',
      ref: ref || null,
      props: { 
        ...props,
        children: typeof children === 'function' ? children() : children
      }
    }),
    Header: ({ children, ref, ...props }) => ({
      $$typeof: Symbol.for('react.element'),
      type: 'div',
      ref: ref || null,
      props: { 
        ...props,
        children: typeof children === 'function' ? children() : children
      }
    }),
    Body: ({ children, ref, ...props }) => ({
      $$typeof: Symbol.for('react.element'),
      type: 'div',
      ref: ref || null,
      props: { 
        ...props,
        children: typeof children === 'function' ? children() : children
      }
    }),
    Footer: ({ children, ref, ...props }) => ({
      $$typeof: Symbol.for('react.element'),
      type: 'div',
      ref: ref || null,
      props: { 
        ...props,
        children: typeof children === 'function' ? children() : children
      }
    }),
    Cancel: ({ children, ref, onClick, ...props }) => ({
      $$typeof: Symbol.for('react.element'),
      type: 'button',
      ref: ref || null,
      props: { 
        ...props,
        onClick,
        children: typeof children === 'function' ? children() : children
      }
    }),
    Action: ({ children, ref, onClick, ...props }) => ({
      $$typeof: Symbol.for('react.element'),
      type: 'button',
      ref: ref || null,
      props: { 
        ...props,
        onClick,
        children: typeof children === 'function' ? children() : children
      }
    }),
  };

  return {
    Box: ({ children, ref, padding, ...props }) => {
      const { marginTop, marginBottom, paddingBottom, alignItems, fullWidth, ...restProps } = props;
      return {
        $$typeof: Symbol.for('react.element'),
        type: 'div',
        ref: ref || null,
        props: { 
          ...restProps,
          style: { 
            padding: padding ? `${padding}px` : undefined,
            marginTop: marginTop ? `${marginTop}px` : undefined,
            marginBottom: marginBottom ? `${marginBottom}px` : undefined,
            paddingBottom: paddingBottom ? `${paddingBottom}px` : undefined,
            alignItems: alignItems,
            width: fullWidth ? '100%' : undefined
          },
          children: typeof children === 'function' ? children() : children 
        }
      };
    },
    Button: ({ children, ref, onClick, startIcon, variant, ...props }) => {
      const { fullWidth, ...restProps } = props;
      return {
        $$typeof: Symbol.for('react.element'),
        type: 'button',
        ref: ref || null,
        props: { 
          ...restProps,
          style: {
            width: fullWidth ? '100%' : undefined,
            backgroundColor: variant === 'danger-light' ? '#ffebee' : 
                           variant === 'success-light' ? '#e8f5e9' :
                           variant === 'secondary' ? '#f5f5f5' : undefined
          },
          onClick,
          children: [
            startIcon && typeof startIcon === 'function' ? startIcon() : startIcon,
            typeof children === 'function' ? children() : children
          ].filter(Boolean)
        }
      };
    },
    Flex: ({ children, ref, gap, marginTop, ...props }) => {
      const { alignItems, ...restProps } = props;
      return {
        $$typeof: Symbol.for('react.element'),
        type: 'div',
        ref: ref || null,
        props: { 
          ...restProps,
          style: { 
            gap: gap ? `${gap}px` : undefined,
            marginTop: marginTop ? `${marginTop}px` : undefined,
            alignItems: alignItems
          },
          children: typeof children === 'function' ? children() : children
        }
      };
    },
    Typography: ({ children, ref, variant, ...props }) => ({
      $$typeof: Symbol.for('react.element'),
      type: 'div',
      ref: ref || null,
      props: { 
        ...props,
        style: { fontWeight: variant === 'beta' ? 'bold' : undefined },
        children: typeof children === 'function' ? children() : children
      }
    }),
    TextInput: ({ children, ref, onChange, ...props }) => ({
      $$typeof: Symbol.for('react.element'),
      type: 'input',
      ref: ref || null,
      props: { 
        ...props,
        onChange,
        children: typeof children === 'function' ? children() : children
      }
    }),
    Dialog,
    SingleSelect: ({ children, ref, onChange, ...props }) => ({
      $$typeof: Symbol.for('react.element'),
      type: 'select',
      ref: ref || null,
      props: { 
        ...props,
        onChange,
        children: typeof children === 'function' ? children() : children
      }
    }),
    SingleSelectOption: ({ children, ref, ...props }) => ({
      $$typeof: Symbol.for('react.element'),
      type: 'option',
      ref: ref || null,
      props: { 
        ...props,
        children: typeof children === 'function' ? children() : children
      }
    }),
  };
});

// Mock Strapi icons
jest.mock('@strapi/icons', () => ({
  Plus: ({ ref, ...props }) => ({
    $$typeof: Symbol.for('react.element'),
    type: 'span',
    ref: ref || null,
    props: { ...props, children: 'Plus' }
  }),
  Trash: ({ ref, ...props }) => ({
    $$typeof: Symbol.for('react.element'),
    type: 'span',
    ref: ref || null,
    props: { ...props, children: 'Trash' }
  }),
  Drag: ({ ref, ...props }) => ({
    $$typeof: Symbol.for('react.element'),
    type: 'span',
    ref: ref || null,
    props: { ...props, children: 'Drag' }
  }),
})); 