import { Main, Flex, Typography, Box } from '@strapi/design-system';

const HomePage = () => {

  return (
    <Main>
      <Flex padding={10 }gap={{
    initial: 1,
    medium: 4,
    large: 8
  }} direction={{
    initial: 'column',
    medium: 'row'
  }} alignItems={{
    initial: 'center',
    medium: 'flex-start'
    
  }}>
      <Box  padding={1}>
        <Typography variant="alpha">Status manager</Typography>
      </Box>
    </Flex>
    </Main>
  );
};

export { HomePage };
