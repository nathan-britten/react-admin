import RichTextInput from 'ra-input-rich-text';
import * as React from 'react';
import {
    TopToolbar,
    AutocompleteInput,
    ArrayInput,
    BooleanInput,
    CheckboxGroupInput,
    Datagrid,
    DateField,
    DateInput,
    Edit,
    CloneButton,
    ShowButton,
    EditButton,
    FormTab,
    ImageField,
    ImageInput,
    NumberInput,
    ReferenceManyField,
    ReferenceInput,
    SelectInput,
    SimpleFormIterator,
    TabbedForm,
    TextField,
    TextInput,
    minValue,
    number,
    required,
    FormDataConsumer,
    useCreateSuggestionContext,
    EditActionsProps,
    useNotify,
    useRefresh,
} from 'react-admin'; // eslint-disable-line import/no-unresolved
import {
    Box,
    BoxProps,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    TextField as MuiTextField,
} from '@material-ui/core';

import PostTitle from './PostTitle';
import TagReferenceInput from './TagReferenceInput';

const CreateCategory = ({
    onAddChoice,
}: {
    onAddChoice: (record: any) => void;
}) => {
    const { filter, onCancel, onCreate } = useCreateSuggestionContext();
    const [value, setValue] = React.useState(filter || '');
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const choice = { name: value, id: value.toLowerCase() };
        onAddChoice(choice);
        onCreate(choice);
        setValue('');
        return false;
    };
    return (
        <Dialog open onClose={onCancel}>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <MuiTextField
                        label="New Category"
                        value={value}
                        onChange={event => setValue(event.target.value)}
                        autoFocus
                    />
                </DialogContent>
                <DialogActions>
                    <Button type="submit">Save</Button>
                    <Button onClick={onCancel}>Cancel</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

const EditActions = ({ basePath, data, hasShow }: EditActionsProps) => (
    <TopToolbar>
        <CloneButton
            className="button-clone"
            basePath={basePath}
            record={data}
        />
        {hasShow && <ShowButton basePath={basePath} record={data} />}
    </TopToolbar>
);

const SanitizedBox = ({
    fullWidth,
    basePath,
    ...props
}: BoxProps & { fullWidth?: boolean; basePath?: string }) => <Box {...props} />;

const categories = [
    { name: 'Tech', id: 'tech' },
    { name: 'Lifestyle', id: 'lifestyle' },
];

const PostEdit = ({ permissions, ...props }) => {
    const notify = useNotify();
    const refresh = useRefresh();
    function onSuccess() {
        notify('Changes were saved successfully');
        refresh();
    }
    return (
        <Edit
            title={<PostTitle />}
            actions={<EditActions />}
            {...props}
            onSuccess={onSuccess}
        >
            <TabbedForm
                initialValues={{ average_note: 0 }}
                warnWhenUnsavedChanges
                mutationMode="pessimistic"
            >
                <FormTab label="post.form.miscellaneous">
                    <ArrayInput source="backlinks">
                        <SimpleFormIterator>
                            <TextInput source="url" validate={required()} />
                            <ArrayInput source="date">
                                <SimpleFormIterator>
                                    <TextInput source="name" />
                                    <TextInput source="something" />
                                </SimpleFormIterator>
                            </ArrayInput>
                        </SimpleFormIterator>
                    </ArrayInput>
                </FormTab>
            </TabbedForm>
        </Edit>
    );
};

export default PostEdit;
