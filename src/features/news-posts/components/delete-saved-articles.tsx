'use client';
import { ConfirmationDialog } from '@/components/dashboard/ui/dialog/confirmation-dialog';
import { useNotifications } from '@/components/dashboard/ui/notifications';
import { Button } from '@/components/dashboard/ui/button';
import { useDeleteSavedArticle } from '../api/delete-article';

type DeleteSavedArticleProps = {
  id: number;
};

/**
 * Component for deleting a saved article.
 *
 * This component renders a confirmation dialog that prompts the user to confirm the deletion of a saved article.
 * Upon confirmation, it triggers a mutation to delete the article and displays a success notification.
 *
 * @param {DeleteSavedArticleProps} props - The props for the component.
 * @param {string} props.id - The ID of the saved article to be deleted.
 *
 * @returns {JSX.Element} The rendered confirmation dialog component.
 */
export const DeleteSavedArticle = ({ id }: DeleteSavedArticleProps) => {
  const { addNotification } = useNotifications();
  const deleteSavedArticleMutation = useDeleteSavedArticle({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: 'Saved Article Deleted',
        });
      },
    },
  });

  return (
    <ConfirmationDialog
      icon="danger"
      title="Delete Saved Article"
      body="Are you sure you want to delete this saved article?"
      triggerButton={<Button variant="destructive">Delete</Button>}
      confirmButton={
        <Button
          isLoading={deleteSavedArticleMutation.isPending}
          type="button"
          variant="destructive"
          onClick={() => deleteSavedArticleMutation.mutate({ articleId: id })}
        >
          Delete Saved Article
        </Button>
      }
    />
  );
};
