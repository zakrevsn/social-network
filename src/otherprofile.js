class OtherProfile extends React.Component {
    componentDidMount() {
        const id = this.prop.match.params.id;
    }
    // axios.get('/user/ + id').then({data}) => {
    //     if (data.redirect) {
    //         this.props.history.push('/');
    //     }
    }
}
