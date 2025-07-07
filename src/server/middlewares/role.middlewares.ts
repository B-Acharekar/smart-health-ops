export function requireRole(role: string) {
  return (handler: any) => {
    return async (req: any) => {
      if (req.user?.role !== role) {
        return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403 });
      }
      return handler(req);
    };
  };
}
