/**
 * Styled Components Best Practices Example
 * 
 * This file demonstrates proper usage of transient props to avoid
 * "Received true for a non-boolean attribute" warnings.
 */

import styled from 'styled-components';

// ❌ BAD: Regular props get passed to DOM
const BadButton = styled.button<{ active: boolean }>`
  background: ${props => props.active ? '#00a652' : '#ccc'};
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;

// ✅ GOOD: Transient props (prefixed with $) don't get passed to DOM
const GoodButton = styled.button<{ $active: boolean }>`
  background: ${props => props.$active ? '#00a652' : '#ccc'};
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  
  /* You can also combine with regular props */
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.$active ? '#008040' : '#bbb'};
  }
`;

// ✅ COMPLEX EXAMPLE: Multiple transient props
const Card = styled.div<{ 
  $active: boolean; 
  $variant: 'primary' | 'secondary';
  $size: 'small' | 'medium' | 'large';
}>`
  padding: ${props => {
    switch (props.$size) {
      case 'small': return '12px';
      case 'medium': return '16px';
      case 'large': return '24px';
      default: return '16px';
    }
  }};
  
  border-radius: 8px;
  border: 2px solid ${props => 
    props.$variant === 'primary' ? '#00a652' : '#e0e0e0'
  };
  
  background: ${props => 
    props.$active 
      ? props.$variant === 'primary' ? '#00a652' : '#f5f5f5'
      : 'white'
  };
  
  color: ${props => 
    props.$active && props.$variant === 'primary' ? 'white' : '#333'
  };
  
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

// ✅ USAGE EXAMPLES
export const StyledComponentExamples = () => {
  return (
    <div>
      {/* ❌ This would cause a warning */}
      {/* <BadButton active={true}>Bad Button</BadButton> */}
      
      {/* ✅ These work correctly */}
      <GoodButton $active={true}>Active Button</GoodButton>
      <GoodButton $active={false}>Inactive Button</GoodButton>
      
      <Card 
        $active={true} 
        $variant="primary" 
        $size="medium"
      >
        Primary Active Card
      </Card>
      
      <Card 
        $active={false} 
        $variant="secondary" 
        $size="large"
      >
        Secondary Inactive Card
      </Card>
    </div>
  );
};

export default StyledComponentExamples;
