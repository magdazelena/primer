require('@testing-library/jest-dom');
require('@testing-library/react');

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

// Mock ThemeProvider
jest.mock('@strapi/design-system', () => {
  const mockReact = require('react');
  
  const ThemeProvider = ({ children }) => ({
    $$typeof: Symbol.for('react.element'),
    type: 'div',
    props: { children }
  });

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
          children: Array.isArray(children) ? children.filter(Boolean).map((child, index) => {
            if (child && child.type === Dialog.Trigger) {
              return mockReact.cloneElement(child, { 
                onClick: handleTriggerClick,
                key: child.key || `trigger-${index}` 
              });
            }
            return child && typeof child === 'object' ? { ...child, key: child.key || `child-${index}` } : child;
          }) : children
        }
      };
    },
    Trigger: ({ children, ref, onClick, ...props }) => ({
      $$typeof: Symbol.for('react.element'),
      type: 'div',
      ref: ref || null,
      props: { 
        ...props,
        onClick,
        children: Array.isArray(children) ? children.filter(Boolean).map((child, index) => 
          child && typeof child === 'object' ? { ...child, key: child.key || `trigger-child-${index}` } : child
        ) : children
      }
    }),
    Content: ({ children, ref, ...props }) => ({
      $$typeof: Symbol.for('react.element'),
      type: 'div',
      ref: ref || null,
      props: { 
        ...props,
        children: Array.isArray(children) ? children.filter(Boolean).map((child, index) => 
          child && typeof child === 'object' ? { ...child, key: child.key || `content-child-${index}` } : child
        ) : children
      }
    }),
    Header: ({ children, ref, ...props }) => ({
      $$typeof: Symbol.for('react.element'),
      type: 'div',
      ref: ref || null,
      props: { 
        ...props,
        children: Array.isArray(children) ? children.filter(Boolean).map((child, index) => 
          child && typeof child === 'object' ? { ...child, key: child.key || `header-child-${index}` } : child
        ) : children
      }
    }),
    Body: ({ children, ref, ...props }) => ({
      $$typeof: Symbol.for('react.element'),
      type: 'div',
      ref: ref || null,
      props: { 
        ...props,
        children: Array.isArray(children) ? children.filter(Boolean).map((child, index) => 
          child && typeof child === 'object' ? { ...child, key: child.key || `body-child-${index}` } : child
        ) : children
      }
    }),
    Footer: ({ children, ref, ...props }) => ({
      $$typeof: Symbol.for('react.element'),
      type: 'div',
      ref: ref || null,
      props: { 
        ...props,
        children: Array.isArray(children) ? children.filter(Boolean).map((child, index) => 
          child && typeof child === 'object' ? { ...child, key: child.key || `footer-child-${index}` } : child
        ) : children
      }
    }),
    Cancel: ({ children, ref, onClick, ...props }) => ({
      $$typeof: Symbol.for('react.element'),
      type: 'div',
      ref: ref || null,
      props: { 
        ...props,
        onClick,
        children: Array.isArray(children) ? children.filter(Boolean).map((child, index) => 
          child && typeof child === 'object' ? { ...child, key: child.key || `cancel-child-${index}` } : child
        ) : children
      }
    }),
    Action: ({ children, ref, onClick, ...props }) => ({
      $$typeof: Symbol.for('react.element'),
      type: 'div',
      ref: ref || null,
      props: { 
        ...props,
        onClick,
        children: Array.isArray(children) ? children.filter(Boolean).map((child, index) => 
          child && typeof child === 'object' ? { ...child, key: child.key || `action-child-${index}` } : child
        ) : children
      }
    }),
  };

  const createStyledElement = (type, props, children) => {
    const { style, marginTop, marginBottom, padding, paddingBottom, ...restProps } = props;
    return {
      $$typeof: Symbol.for('react.element'),
      type,
      ref: props.ref || null,
      props: {
        ...restProps,
        style: {
          ...style,
          marginTop: marginTop ? `${marginTop}px` : undefined,
          marginBottom: marginBottom ? `${marginBottom}px` : undefined,
          padding: padding ? `${padding}px` : undefined,
          paddingBottom: paddingBottom ? `${paddingBottom}px` : undefined
        },
        children: typeof children === 'function' ? children() : children
      }
    };
  };

  return {
    ThemeProvider,
    Box: ({ children, ref, padding, ...props }) => {
      const { marginTop, marginBottom, alignItems, fullWidth, ...restProps } = props;
      return createStyledElement('div', {
        ...restProps,
        ref,
        marginTop,
        marginBottom,
        padding,
        style: { 
          alignItems: alignItems,
          width: fullWidth ? '100%' : undefined
        }
      }, Array.isArray(children) ? children.map((child, index) => 
        typeof child === 'object' ? { ...child, key: child.key || `box-child-${index}` } : child
      ) : children);
    },
    Button: ({ children, ref, onClick, startIcon, variant, ...props }) => {
      const { fullWidth, ...restProps } = props;
      return createStyledElement('div', {
        ...restProps,
        ref,
        onClick,
        style: {
          width: fullWidth ? '100%' : undefined,
          backgroundColor: variant === 'danger-light' ? '#ffebee' : 
                         variant === 'success-light' ? '#e8f5e9' :
                         variant === 'secondary' ? '#f5f5f5' : undefined
        }
      }, [
        startIcon && typeof startIcon === 'function' ? startIcon() : startIcon,
        typeof children === 'function' ? children() : children
      ].filter(Boolean));
    },
    Flex: ({ children, ref, gap, marginTop, ...props }) => {
      const { alignItems, ...restProps } = props;
      return createStyledElement('div', {
        ...restProps,
        ref,
        gap,
        marginTop,
        style: { 
          alignItems: alignItems
        }
      }, Array.isArray(children) ? children.map((child, index) => 
        typeof child === 'object' ? { ...child, key: child.key || index } : child
      ) : children);
    },
    Typography: ({ children, ref, variant, ...props }) => createStyledElement('div', {
      ...props,
      ref,
      style: { fontWeight: variant === 'beta' ? 'bold' : undefined }
    }, children),
    TextInput: ({ children, ref, onChange, ...props }) => createStyledElement('input', {
      ...props,
      ref,
      onChange,
      type: 'text'
    }, children),
    Dialog,
    SingleSelect: ({ children, ref, onChange, ...props }) => createStyledElement('select', {
      ...props,
      ref,
      onChange
    }, children),
    SingleSelectOption: ({ children, ref, value, ...props }) => createStyledElement('option', {
      ...props,
      ref,
      value,
      key: value
    }, children),
    NumberInput: ({ label, value, onValueChange, ...props }) => createStyledElement('div', {
      ...props,
      children: [
        createStyledElement('label', { key: 'label' }, label),
        createStyledElement('input', {
          key: 'input',
          type: 'number',
          value,
          onChange: (e) => onValueChange(Number(e.target.value)),
          ...props
        })
      ]
    }),
    MultiSelect: ({ value, onChange, placeholder, children, ...props }) => createStyledElement('div', {
      ...props,
      children: [
        createStyledElement('input', {
          key: 'input',
          type: 'text',
          value: value.join(','),
          onChange: (e) => onChange(e.target.value.split(',').filter(Boolean)),
          placeholder,
          ...props
        }),
        ...(Array.isArray(children) ? children.map((child, index) => 
          typeof child === 'object' ? { ...child, key: child.key || index } : child
        ) : [children])
      ]
    }),
    MultiSelectOption: ({ children, value, ...props }) => createStyledElement('option', {
      ...props,
      value,
      key: value
    }, children),
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