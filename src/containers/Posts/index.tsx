import { ChangeEvent, FC, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../../components/Button';
import PageContainer from '../../components/PageContainer';
import TextInput from '../../components/TextInput';
import H1 from '../../components/Typography/H1';
import TranslationConstants from '../../i18n/TranslationConstants';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectPosts } from '../../store/posts/postsSelectors';
import { getPosts } from '../../store/posts/postsSlice';
import Post from '../../types/Post';
import PostsList from './PostsList';

const filterPostsByText = (text: string, posts: Post[]): Post[] =>
  posts.filter(post => post.title.match(text));

const Posts: FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPosts);
  const [text, setText] = useState('');
  const filteredPosts: Post[] = useMemo(
    () => filterPostsByText(text, posts),
    [text, posts],
  );

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.currentTarget.value);
  };

  const handleOnClick = () => {
    setText('');
  };

  return (
    <PageContainer>
      <H1>{t(TranslationConstants.Posts.title)}</H1>
      <TextInput
        value={text}
        onChange={handleOnChange}
        id="text"
        name="example"
        label={t(TranslationConstants.Posts.textInputLabel)}
        placeholder={t(TranslationConstants.Posts.textInputPlaceholder)}
      />
      <Button onClick={handleOnClick}>
        {t(TranslationConstants.Posts.clear)}
      </Button>
      <PostsList posts={filteredPosts} />
    </PageContainer>
  );
};

export default Posts;
