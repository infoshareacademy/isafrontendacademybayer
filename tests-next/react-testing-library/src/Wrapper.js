export const Wrapper = (props) => (
        <div style={
            {
               display: 'flex',
               flexDirection: 'column',
               alignItems: 'center',
               marginTop: '30px'
            }
        }>
            {props.children}
        </div>
    );