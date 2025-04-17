  <td className="py-3 px-4">
    <div className="flex flex-wrap gap-2">
      {contact.tags.slice(0, 1).map((tag) => (
        <Badge key={tag} variant="outline" className="font-medium bg-white text-gray-500 border-gray-200">
          {tag}
        </Badge>
      ))}
    </div>
  </td> 